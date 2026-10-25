export function sendSuccess(res, data, message = "Berhasil", status = 200) {
  res.status(status).json({ success: true, message, data });
}
