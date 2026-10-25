import { createHmac, timingSafeEqual } from "node:crypto";
import { config } from "../../config.js";

const toBase64Url = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");
const sign = (data) => createHmac("sha256", config.authSecret).update(data).digest("base64url");

export function createToken(user) {
  const expiresAt = Math.floor(Date.now() / 1000) + config.tokenTtlSeconds;
  const payload = toBase64Url({ sub: user.id, username: user.username, exp: expiresAt });
  return `${payload}.${sign(payload)}`;
}

/** Mengembalikan isi token jika tanda tangannya benar dan belum kedaluwarsa, selain itu null. */
export function verifyToken(token) {
  const [payload, signature] = String(token).split(".");
  if (!payload || !signature) return null;

  const expected = Buffer.from(sign(payload));
  const actual = Buffer.from(signature);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;

  const data = JSON.parse(Buffer.from(payload, "base64url").toString());
  return data.exp > Date.now() / 1000 ? data : null;
}
