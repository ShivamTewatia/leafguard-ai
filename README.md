# LeafGuard AI

Premium full-stack plant disease detection: **React + Vite + Tailwind** frontend and **Flask + TensorFlow** backend, designed for deployment on **Vercel** (frontend) and **Render** (backend).

## Repository layout

- `frontend/` — React SPA, Framer Motion, Axios, theme persistence
- `backend/` — Flask API, image preprocessing, `/predict` endpoint

## File structure

```
leafguard-ai/
├── README.md
├── .gitignore
├── render.yaml
├── backend/
│   ├── app.py
│   ├── Procfile
│   ├── requirements.txt
│   ├── .env.example
│   ├── labels.json
│   └── disease_metadata.json
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── vercel.json
    ├── .env.example
    ├── .eslintrc.cjs
    ├── index.html
    ├── public/
    │   └── leaf.svg
    └── src/
        ├── main.jsx
        ├── index.css
        ├── App.jsx
        ├── Layout.jsx
        ├── components/
        │   ├── AnimatedBackground.jsx
        │   ├── DiseaseCard.jsx
        │   ├── Footer.jsx
        │   ├── HeroSection.jsx
        │   ├── Loader.jsx
        │   ├── Modal.jsx
        │   ├── Navbar.jsx
        │   ├── PlantCard.jsx
        │   ├── ResultCard.jsx
        │   ├── Skeleton.jsx
        │   ├── ThemeToggle.jsx
        │   └── UploadBox.jsx
        ├── context/
        │   └── ThemeContext.jsx
        ├── data/
        │   └── plants.js
        ├── pages/
        │   ├── About.jsx
        │   ├── Contact.jsx
        │   ├── Detect.jsx
        │   ├── Home.jsx
        │   └── Library.jsx
        └── services/
            ├── api.js
            └── imagePrep.js
```

## Quick start (local)

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Place your trained model as plant_disease_fewshot_model.h5 or set MODEL_PATH
python app.py
```

API runs at `http://127.0.0.1:5000` by default.

### Frontend

```bash
cd frontend
npm install
# Local dev: do NOT set VITE_API_URL — Vite proxies /api → http://127.0.0.1:5000 (no CORS friction).
# Production (Vercel): set VITE_API_URL to your Render API origin (no trailing slash).
npm run dev
```

If you **must** call Flask directly from the browser in dev, set `VITE_API_URL=http://127.0.0.1:5000` and ensure `FRONTEND_ORIGIN` in Flask matches the exact origin you open (e.g. both `http://localhost:5173` and `http://127.0.0.1:5173` if you switch).

## Environment variables

### Backend (`backend/.env`)

| Variable | Description |
|----------|-------------|
| `PORT` | Listen port (Render sets this automatically) |
| `FLASK_DEBUG` | `1` for debug (local only) |
| `MODEL_PATH` | Path to `.h5` model (default: `plant_disease_fewshot_model.h5` next to `app.py`) |
| `LABELS_PATH` | JSON array of class names in model output order (default: `labels.json`) |
| `FRONTEND_ORIGIN` | CORS origin for production (e.g. your Vercel URL). Comma-separated for multiple. |
| `MOCK_PREDICTIONS` | `1` to force mock predictions without loading TensorFlow (useful for CI/UI) |

### Frontend (`frontend/.env` / Vercel)

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Production / special: full API origin. **Omit in local dev** to use the built-in Vite `/api` proxy. |
| `VITE_DEV_API_PROXY` | Optional; proxy target (default `http://127.0.0.1:5000`). |

## Model alignment

1. Copy your `plant_disease_fewshot_model.h5` into `backend/` (or set `MODEL_PATH`).
2. Edit `backend/labels.json` so the **i-th** string matches the **i-th** output neuron of your model (same order as training).

If the model file is missing, the API runs in **mock mode** for UI development (deterministic pseudo-predictions).

## Deploy

### Frontend (Vercel)

1. Import the repo (or connect GitHub).
2. Root directory: `frontend`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Set **`VITE_API_URL`** to your deployed API origin (e.g. `https://your-service.onrender.com`, no trailing slash).

**Why you saw 403:** a catch‑all rewrite `/(.*) → /` sends **`POST /api/predict`** to **`POST /`**, and many static hosts respond with **403** to that. This repo’s `vercel.json` excludes **`/api/`** from the SPA fallback so `/api` is not rewritten to `/`. You still need either a full **`VITE_API_URL`** to Render or an extra rewrite that proxies **`/api/:path*`** to your backend.

### Backend — Render

1. New **Web Service** from this repo.
2. Root directory: `backend`
3. Build: `pip install -r requirements.txt`
4. Start: `gunicorn app:app`
5. Environment: set `FRONTEND_ORIGIN` to your Vercel URL; upload or bind your `.h5` (e.g. build step fetch from object storage, or commit with Git LFS).

Optional: use included `render.yaml` as a blueprint after adjusting service names.

## API

`POST /predict` — multipart form field `image` (file).

Response JSON:

```json
{
  "prediction": "Healthy",
  "confidence": 92.4,
  "description": "...",
  "prevention": "...",
  "cure": "..."
}
```

## License

MIT — adjust as needed for your organization.
