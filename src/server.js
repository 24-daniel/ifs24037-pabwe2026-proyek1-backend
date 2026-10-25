import { createApp } from "./app.js";
import { config } from "./config.js";
import { seedIfEmpty } from "./db/seed.js";

seedIfEmpty();

createApp().listen(config.port, () => {
  console.log(`JadwalIbadah API berjalan di http://localhost:${config.port}`);
});
