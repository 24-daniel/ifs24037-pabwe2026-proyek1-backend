import { describe, expect, test } from "bun:test";
import { hashPassword, verifyPassword } from "./password.js";
import { createToken, verifyToken } from "./token.js";

describe("password", () => {
  test("hash bisa diverifikasi dan password salah ditolak", () => {
    const hash = hashPassword("rahasia123");
    expect(verifyPassword("rahasia123", hash)).toBe(true);
    expect(verifyPassword("salah", hash)).toBe(false);
  });
});

describe("token", () => {
  test("token valid dibaca kembali", () => {
    const token = createToken({ id: 1, username: "admin" });
    expect(verifyToken(token)).toMatchObject({ sub: 1, username: "admin" });
  });

  test("token yang diubah ditolak", () => {
    const [payload, signature] = createToken({ id: 1, username: "admin" }).split(".");
    expect(verifyToken(`${payload}x.${signature}`)).toBeNull();
    expect(verifyToken("bukan-token")).toBeNull();
  });
});
