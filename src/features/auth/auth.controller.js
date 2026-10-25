import { sendSuccess } from "../../utils/response.js";
import * as service from "./auth.service.js";

export function register(req, res) {
  sendSuccess(res, service.register(req.body), "Akun berhasil dibuat", 201);
}

export function login(req, res) {
  sendSuccess(res, service.login(req.body), "Login berhasil");
}

export function me(req, res) {
  sendSuccess(res, service.getProfile(req.user.id), "Profil pengguna");
}
