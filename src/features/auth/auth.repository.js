import { db } from "../../db/database.js";

const toUser = (row) =>
  row && { id: row.id, username: row.username, email: row.email, passwordHash: row.password_hash };

export const findByEmail = (email) => toUser(db.prepare("SELECT * FROM users WHERE email = ?").get(email));

export const findById = (id) => toUser(db.prepare("SELECT * FROM users WHERE id = ?").get(id));

export function create({ username, email, passwordHash }) {
  db.prepare("INSERT INTO users (username, email, password_hash) VALUES (@username, @email, @passwordHash)").run({
    username,
    email,
    passwordHash,
  });
}
