import { AppError } from "../../utils/AppError.js";
import { sendSuccess } from "../../utils/response.js";
import * as service from "./events.service.js";

function parseId(raw) {
  const id = Number(raw);
  if (!Number.isInteger(id) || id < 1) throw new AppError(400, "ID kegiatan tidak valid.");
  return id;
}

export function index(req, res) {
  const { category, search, from } = req.query;
  sendSuccess(res, service.listEvents({ category, search, from }), "Daftar kegiatan");
}

export function show(req, res) {
  sendSuccess(res, service.getEvent(parseId(req.params.id)), "Detail kegiatan");
}

export function store(req, res) {
  sendSuccess(res, service.createEvent(req.body), "Kegiatan ditambahkan", 201);
}

export function update(req, res) {
  sendSuccess(res, service.updateEvent(parseId(req.params.id), req.body), "Kegiatan diperbarui");
}

export function destroy(req, res) {
  service.deleteEvent(parseId(req.params.id));
  sendSuccess(res, null, "Kegiatan dihapus");
}
