/**
 * Client-side resize to 224×224 (backend also normalizes).
 * Returns a JPEG File suitable for multipart upload.
 */
export async function prepareImageForModel(file) {
  const bitmap = await createImageBitmap(file)
  const canvas = document.createElement('canvas')
  canvas.width = 224
  canvas.height = 224
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas not supported')

  // Cover-fit crop to reduce distortion
  const scale = Math.max(224 / bitmap.width, 224 / bitmap.height)
  const w = bitmap.width * scale
  const h = bitmap.height * scale
  const dx = (224 - w) / 2
  const dy = (224 - h) / 2
  ctx.drawImage(bitmap, dx, dy, w, h)

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('encode failed'))), 'image/jpeg', 0.92)
  })

  const safeName = file.name.replace(/\.[^.]+$/, '') || 'leaf'
  return new File([blob], `${safeName}_224.jpg`, { type: 'image/jpeg' })
}
