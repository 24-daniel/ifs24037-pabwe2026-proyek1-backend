import { db } from "../../db/database.js";

const toEvent = (row) =>
  row && {
    id: row.id,
    title: row.title,
    category: row.category,
    eventDate: row.event_date,
    startTime: row.start_time,
    location: row.location,
    leader: row.leader,
    description: row.description,
  };

export function findAll({ category, search, from } = {}) {
  const conditions = [];
  const params = {};

  if (category) {
    conditions.push("category = @category");
    params.category = category;
  }
  if (search) {
    conditions.push("(title LIKE @search OR location LIKE @search OR leader LIKE @search)");
    params.search = `%${search}%`;
  }
  if (from) {
    conditions.push("event_date >= @from");
    params.from = from;
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const sql = `SELECT * FROM events ${where} ORDER BY event_date, start_time`;
  return db.prepare(sql).all(params).map(toEvent);
}

export function findById(id) {
  return toEvent(db.prepare("SELECT * FROM events WHERE id = ?").get(id));
}

export function count() {
  return db.prepare("SELECT COUNT(*) AS total FROM events").get().total;
}

export function create(event) {
  const info = db
    .prepare(
      `INSERT INTO events (title, category, event_date, start_time, location, leader, description)
       VALUES (@title, @category, @eventDate, @startTime, @location, @leader, @description)`
    )
    .run(event);
  return findById(info.lastInsertRowid);
}

export function update(id, event) {
  db.prepare(
    `UPDATE events SET title = @title, category = @category, event_date = @eventDate,
       start_time = @startTime, location = @location, leader = @leader, description = @description
     WHERE id = @id`
  ).run({ ...event, id });
  return findById(id);
}

export function remove(id) {
  db.prepare("DELETE FROM events WHERE id = ?").run(id);
}
