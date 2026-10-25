// Bun membaca file .env secara otomatis, jadi tidak perlu paket dotenv.
export const config = {
  port: Number(process.env.PORT) || 8000,
  dbPath: process.env.DB_PATH || "./data/jadwalibadah.db",
  corsOrigins: (process.env.CORS_ORIGIN || "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim().replace(/\/+$/, ""))
    .filter(Boolean),
};
