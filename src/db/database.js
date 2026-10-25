import fs from "node:fs";
import path from "node:path";
import { Database } from "bun:sqlite";
import { config } from "../config.js";

fs.mkdirSync(path.dirname(config.dbPath), { recursive: true });

// strict: true membuat parameter bernama (@title, dst.) bisa diikat tanpa awalan.
export const db = new Database(config.dbPath, { create: true, strict: true });
db.exec("PRAGMA journal_mode = WAL;");

db.exec(`
  CREATE TABLE IF NOT EXISTS events (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT NOT NULL,
    category    TEXT NOT NULL,
    event_date  TEXT NOT NULL,
    start_time  TEXT NOT NULL,
    location    TEXT NOT NULL,
    leader      TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT ''
  );
  CREATE INDEX IF NOT EXISTS idx_events_schedule ON events (event_date, start_time);
`);
