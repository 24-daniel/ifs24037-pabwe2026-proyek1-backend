import cors from "cors";
import express from "express";
import helmet from "helmet";
import { config } from "./config.js";
import { authRouter } from "./features/auth/auth.routes.js";
import { eventsRouter } from "./features/events/events.routes.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";

export function configureApp(app) {
  app.use(helmet());
  app.use(cors({ origin: config.corsOrigins }));
  app.use(express.json({ limit: "20kb" }));

  app.get("/", (req, res) => res.json({ success: true, message: "JadwalIbadah API" }));
  app.get("/api/v1/health", (req, res) => res.json({ success: true, message: "OK" }));
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/events", eventsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}
