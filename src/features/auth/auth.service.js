import { AppError } from "../../utils/AppError.js";
import * as repository from "./auth.repository.js";
import { normalizeEmail, validateRegisterPayload } from "./auth.validator.js";
import { hashPassword, verifyPassword } from "./password.js";
import { createToken } from "./token.js";

const toPublicUser = ({ id, username, email }) => ({ id, username, email });

export function register(body) {
  const { value, errors, isValid } = validateRegisterPayload(body);
  if (!isValid) throw new AppError(422, "Data pendaftaran tidak valid.", errors);

  if (repository.findByEmail(value.email)) {
    throw new AppError(409, "Email sudah terdaftar.", { email: "Email sudah terdaftar, gunakan email lain." });
  }

  repository.create({ username: value.username, email: value.email, passwordHash: hashPassword(value.password) });
  return toPublicUser(repository.findByEmail(value.email));
}

export function login({ email, password } = {}) {
  const isFilled = typeof email === "string" && email.trim() && typeof password === "string" && password;
  if (!isFilled) throw new AppError(422, "Email dan password wajib diisi.");

  const user = repository.findByEmail(normalizeEmail(email));
  if (!user || !verifyPassword(password, user.passwordHash)) {
    throw new AppError(401, "Email atau password salah.");
  }
  return { token: createToken(user), user: toPublicUser(user) };
}

export function getProfile(userId) {
  const user = repository.findById(userId);
  if (!user) throw new AppError(401, "Akun tidak ditemukan. Silakan login ulang.");
  return toPublicUser(user);
}
