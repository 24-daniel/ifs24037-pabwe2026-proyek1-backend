import { describe, expect, test } from "bun:test";
import { validateRegisterPayload } from "./auth.validator.js";

describe("validateRegisterPayload", () => {
  test("menerima data valid dan mengubah email jadi huruf kecil", () => {
    const result = validateRegisterPayload({ username: "Daniel", email: "Daniel@Mail.com", password: "rahasia123" });
    expect(result.isValid).toBe(true);
    expect(result.value.email).toBe("daniel@mail.com");
  });

  test("menolak username pendek, email salah, dan password pendek", () => {
    const result = validateRegisterPayload({ username: "D", email: "bukan-email", password: "123" });
    expect(Object.keys(result.errors).sort()).toEqual(["email", "password", "username"]);
  });
});
