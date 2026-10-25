import { Router } from "express";
import { requireAuth } from "../../middlewares/requireAuth.js";
import * as controller from "./events.controller.js";

export const eventsRouter = Router();

// Membaca jadwal terbuka untuk umum; mengubah data hanya untuk pengurus yang login.
eventsRouter.get("/", controller.index);
eventsRouter.get("/:id", controller.show);
eventsRouter.post("/", requireAuth, controller.store);
eventsRouter.put("/:id", requireAuth, controller.update);
eventsRouter.delete("/:id", requireAuth, controller.destroy);
