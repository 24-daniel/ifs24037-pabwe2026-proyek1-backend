import { Router } from "express";
import * as controller from "./events.controller.js";

export const eventsRouter = Router();

eventsRouter.get("/", controller.index);
eventsRouter.post("/", controller.store);
eventsRouter.get("/:id", controller.show);
eventsRouter.put("/:id", controller.update);
eventsRouter.delete("/:id", controller.destroy);
