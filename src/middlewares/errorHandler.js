import { AppError } from "../utils/AppError.js";

export function notFoundHandler(req, res) {
  res.status(404).json({ success: false, message: "Endpoint tidak ditemukan." });
}

// Express mengenali error handler dari jumlah argumennya (4), jadi `next` wajib ada.
// eslint-disable-next-line no-unused-vars
export function errorHandler(error, req, res, next) {
  if (error instanceof AppError) {
    return res.status(error.status).json({ success: false, message: error.message, errors: error.errors });
  }
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({ success: false, message: "Format JSON tidak valid." });
  }
  console.error(error);
  return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server." });
}
