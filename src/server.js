import { createApp } from "./createApp.js";
import { config } from "./config.js";
import { seedIfEmpty } from "./db/seed.js";

seedIfEmpty();
const app = createApp();

// Di Vercel, platform yang menjalankan server. Di komputer sendiri kita jalankan manual.
if (!process.env.VERCEL) {
  app.listen(config.port, () => {
    console.log(`JadwalIbadah API berjalan di http://localhost:${config.port}`);
  });
}

export default app;
