import { AppError } from "../../utils/AppError.js";
import * as repository from "./events.repository.js";
import { validateEventPayload } from "./events.validator.js";

function parseValidPayload(body) {
  const { value, errors, isValid } = validateEventPayload(body);
  if (!isValid) throw new AppError(422, "Data kegiatan tidak valid.", errors);
  return value;
}

export const listEvents = (filters) => repository.findAll(filters);

export function getEvent(id) {
  const event = repository.findById(id);
  if (!event) throw new AppError(404, "Kegiatan tidak ditemukan.");
  return event;
}

export const createEvent = (body) => repository.create(parseValidPayload(body));

export function updateEvent(id, body) {
  getEvent(id);
  return repository.update(id, parseValidPayload(body));
}

export function deleteEvent(id) {
  getEvent(id);
  repository.remove(id);
}
