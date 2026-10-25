import { describe, expect, test } from "bun:test";
import { validateEventPayload } from "./events.validator.js";

const validBody = {
  title: "Ibadah Raya",
  category: "ibadah",
  eventDate: "2026-11-01",
  startTime: "09:00",
  location: "Gedung Gereja",
};

describe("validateEventPayload", () => {
  test("menerima data yang valid", () => {
    expect(validateEventPayload(validBody).isValid).toBe(true);
  });

  test("menolak kategori, tanggal, dan jam yang salah", () => {
    const result = validateEventPayload({
      ...validBody,
      category: "lain",
      eventDate: "01-11-2026",
      startTime: "25:00",
    });
    expect(Object.keys(result.errors).sort()).toEqual(["category", "eventDate", "startTime"]);
  });
});
