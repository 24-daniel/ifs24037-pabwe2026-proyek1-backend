const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 100;

const clean = (value) => (typeof value === "string" ? value.trim() : "");

export const normalizeEmail = (email) => clean(email).toLowerCase();

export function validateRegisterPayload(body = {}) {
  const value = {
    username: clean(body.username),
    email: normalizeEmail(body.email),
    password: typeof body.password === "string" ? body.password : "",
  };

  const errors = {};
  if (value.username.length < 3 || value.username.length > 30) {
    errors.username = "Username harus 3–30 karakter.";
  }
  if (!EMAIL_PATTERN.test(value.email) || value.email.length > 100) {
    errors.email = "Format email tidak valid.";
  }
  if (value.password.length < MIN_PASSWORD_LENGTH || value.password.length > MAX_PASSWORD_LENGTH) {
    errors.password = `Password minimal ${MIN_PASSWORD_LENGTH} karakter.`;
  }

  return { value, errors, isValid: Object.keys(errors).length === 0 };
}
