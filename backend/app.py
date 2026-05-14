"""
LeafGuard AI — Flask API for plant disease prediction.

Loads a Keras .h5 model when available; otherwise serves deterministic mock
predictions so the frontend can be developed without the binary model file.
"""

from __future__ import annotations

import hashlib
import json
import logging
import os
from pathlib import Path

import numpy as np
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from PIL import Image

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("leafguard")

BASE_DIR = Path(__file__).resolve().parent

MODEL_PATH = Path(os.getenv("MODEL_PATH", BASE_DIR / "plant_disease_fewshot_model.h5"))
LABELS_PATH = Path(os.getenv("LABELS_PATH", BASE_DIR / "labels.json"))
METADATA_PATH = BASE_DIR / "disease_metadata.json"
MOCK_PREDICTIONS = os.getenv("MOCK_PREDICTIONS", "0").lower() in {"1", "true", "yes"}

# TensorFlow imported lazily to speed up mock/health checks in constrained envs
_tf_model = None
_labels: list[str] = []
_metadata: dict[str, dict[str, str]] = {}


def _load_json(path: Path) -> dict | list:
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def _bootstrap_assets() -> None:
    global _labels, _metadata
    if not LABELS_PATH.exists():
        raise FileNotFoundError(f"Missing labels file: {LABELS_PATH}")
    _labels = _load_json(LABELS_PATH)  # type: ignore[assignment]
    if not isinstance(_labels, list) or not _labels:
        raise ValueError("labels.json must be a non-empty JSON array of strings")

    if METADATA_PATH.exists():
        raw = _load_json(METADATA_PATH)
        if isinstance(raw, dict):
            _metadata = raw  # type: ignore[assignment]


def _load_model():
    """Load Keras model once; raise on failure when model file exists."""
    global _tf_model
    if _tf_model is not None:
        return _tf_model

    if MOCK_PREDICTIONS:
        logger.warning("MOCK_PREDICTIONS enabled — skipping TensorFlow model load")
        return None

    import tensorflow as tf  # noqa: PLC0415 — lazy import

    if not MODEL_PATH.exists():
        logger.warning("Model file not found at %s — using mock predictions", MODEL_PATH)
        return None

    logger.info("Loading TensorFlow model from %s", MODEL_PATH)
    _tf_model = tf.keras.models.load_model(MODEL_PATH, compile=False)
    return _tf_model


def _preprocess_image(file_storage) -> np.ndarray:
    """Resize to 224x224, RGB, float32 in [0, 1], NHWC batch 1."""
    image = Image.open(file_storage.stream).convert("RGB")
    image = image.resize((224, 224), Image.Resampling.LANCZOS)
    arr = np.asarray(image, dtype=np.float32) / 255.0
    batch = np.expand_dims(arr, axis=0)
    return batch


def _mock_index_from_bytes(data: bytes) -> int:
    digest = hashlib.sha256(data).hexdigest()
    return int(digest[:8], 16) % len(_labels)


def _predict_with_model(batch: np.ndarray) -> tuple[int, float]:
    import tensorflow as tf  # noqa: PLC0415

    model = _load_model()
    if model is None:
        raise RuntimeError("Model unavailable")

    preds = model.predict(batch, verbose=0)
    preds = np.asarray(preds)

    # Handle binary sigmoid output
    if preds.ndim == 2 and preds.shape[1] == 1:
        p_pos = float(preds[0, 0])
        idx = 1 if p_pos >= 0.5 else 0
        confidence = p_pos if idx == 1 else 1.0 - p_pos
        idx = min(idx, len(_labels) - 1)
        return idx, float(confidence) * 100.0

    logits = preds[0]
    e = tf.nn.softmax(logits).numpy()
    class_id = int(np.argmax(e))
    class_id = min(max(class_id, 0), len(_labels) - 1)
    confidence = float(np.max(e)) * 100.0
    return class_id, confidence


def _build_response(label: str, confidence: float) -> dict:
    meta = _metadata.get(
        label,
        {
            "description": f"Detected class: {label}. Extend disease_metadata.json to enrich copy.",
            "prevention": "Maintain field hygiene, monitor weekly, and validate with extension services.",
            "cure": "Follow integrated pest management and local product labels.",
        },
    )
    return {
        "prediction": label,
        "confidence": round(float(confidence), 2),
        "description": meta["description"],
        "prevention": meta["prevention"],
        "cure": meta["cure"],
    }


def create_app() -> Flask:
    app = Flask(__name__)

    origins_env = os.getenv("FRONTEND_ORIGIN", "")
    if origins_env.strip():
        origins = [o.strip() for o in origins_env.split(",") if o.strip()]
    else:
        origins = "*"

    # Keep supports_credentials=False: True + wildcard origins is invalid for browsers; it also avoids
    # odd preflight behavior with some clients. Explicit methods/headers help multipart uploads.
    CORS(
        app,
        resources={r"/*": {"origins": origins}},
        supports_credentials=False,
        methods=["GET", "POST", "OPTIONS", "HEAD", "PUT", "PATCH", "DELETE"],
        allow_headers=[
            "Content-Type",
            "Authorization",
            "X-Requested-With",
            "Accept",
            "Origin",
        ],
        expose_headers=["Content-Type"],
        max_age=86400,
    )

    @app.get("/health")
    def health():
        model_ok = MODEL_PATH.exists() and not MOCK_PREDICTIONS
        return jsonify(
            {
                "status": "ok",
                "model_path": str(MODEL_PATH),
                "model_present": MODEL_PATH.exists(),
                "mock_mode": not model_ok,
                "labels": len(_labels),
            }
        )

    @app.post("/predict")
    def predict():
        if "image" not in request.files:
            return jsonify({"error": "Missing multipart field 'image'"}), 400

        file = request.files["image"]
        if not file or file.filename == "":
            return jsonify({"error": "Empty filename"}), 400

        # Read bytes once for mock hashing and TF preprocessing
        file.stream.seek(0)
        raw_bytes = file.read()
        if not raw_bytes:
            return jsonify({"error": "Empty upload"}), 400

        try:
            if MOCK_PREDICTIONS or not MODEL_PATH.exists():
                idx = _mock_index_from_bytes(raw_bytes)
                label = _labels[idx]
                # pseudo-confidence from hash stability
                conf = 65.0 + (_mock_index_from_bytes(raw_bytes + b"salt") % 3000) / 100.0
                conf = min(conf, 99.2)
                return jsonify(_build_response(label, conf))

            from io import BytesIO  # noqa: PLC0415

            batch = _preprocess_image(type("FS", (), {"stream": BytesIO(raw_bytes)})())
            idx, confidence = _predict_with_model(batch)
            if idx < 0 or idx >= len(_labels):
                label = f"Class_{idx}"
            else:
                label = _labels[idx]
            return jsonify(_build_response(label, confidence))
        except Exception as exc:  # noqa: BLE001 — surface useful API errors
            logger.exception("Prediction failed")
            return jsonify({"error": str(exc)}), 500

    return app


# Initialize shared assets at import time for WSGI servers (gunicorn)
_bootstrap_assets()
app = create_app()


if __name__ == "__main__":
    port = int(os.getenv("PORT", "5000"))
    debug = os.getenv("FLASK_DEBUG", "0") == "1"
    app.run(host="0.0.0.0", port=port, debug=debug)
