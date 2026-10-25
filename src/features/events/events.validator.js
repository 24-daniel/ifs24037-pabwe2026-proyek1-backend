import { CATEGORY_VALUES } from "./events.constants.js";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

const clean = (value) => (typeof value === "string" ? value.trim() : "");

export function validateEventPayload(body = {}) {
  const value = {
    title: clean(body.title),
    category: clean(body.category),
    eventDate: clean(body.eventDate),
    startTime: clean(body.startTime),
    location: clean(body.location),
    leader: clean(body.leader),
    description: clean(body.description),
  };

  const errors = {};
  if (value.title.length < 3 || value.title.length > 100) {
    errors.title = "Judul harus 3–100 karakter.";
  }
  if (!CATEGORY_VALUES.includes(value.category)) {
    errors.category = "Kategori tidak valid.";
  }
  if (!DATE_PATTERN.test(value.eventDate) || Number.isNaN(Date.parse(value.eventDate))) {
    errors.eventDate = "Tanggal harus berformat YYYY-MM-DD.";
  }
  if (!TIME_PATTERN.test(value.startTime)) {
    errors.startTime = "Jam harus berformat HH:MM.";
  }
  if (!value.location) {
    errors.location = "Lokasi wajib diisi.";
  }
  if (value.leader.length > 100) {
    errors.leader = "Nama penanggung jawab maksimal 100 karakter.";
  }
  if (value.description.length > 500) {
    errors.description = "Keterangan maksimal 500 karakter.";
  }

  return { value, errors, isValid: Object.keys(errors).length === 0 };
}
