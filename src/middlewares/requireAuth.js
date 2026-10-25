import { verifyToken } from "../features/auth/token.js";
import { AppError } from "../utils/AppError.js";

export function requireAuth(req, res, next) {
  const [scheme, token] = (req.headers.authorization ?? "").split(" ");
  const payload = scheme === "Bearer" ? verifyToken(token) : null;
  if (!payload) throw new AppError(401, "Silakan login terlebih dahulu.");

  req.user = { id: payload.sub, username: payload.username };
  next();
}
