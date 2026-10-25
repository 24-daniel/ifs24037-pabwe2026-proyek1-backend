// Bun membaca file .env secara otomatis, jadi tidak perlu paket dotenv.
// Di Vercel hanya folder /tmp yang bisa ditulis.
const defaultDbPath = process.env.VERCEL ? "/tmp/jadwalibadah.db" : "./data/jadwalibadah.db";
const EIGHT_HOURS_IN_SECONDS = 8 * 60 * 60;

export const config = {
  port: Number(process.env.PORT) || 8000,
  dbPath: process.env.DB_PATH || defaultDbPath,
  corsOrigins: (process.env.CORS_ORIGIN || "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim().replace(/\/+$/, ""))
    .filter(Boolean),
  authSecret: process.env.AUTH_SECRET || "rahasia-pengembangan-ganti-di-production",
  tokenTtlSeconds: EIGHT_HOURS_IN_SECONDS,
};
