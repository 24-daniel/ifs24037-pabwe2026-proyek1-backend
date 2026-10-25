import { Router } from "express";
import { requireAuth } from "../../middlewares/requireAuth.js";
import * as controller from "./auth.controller.js";

export const authRouter = Router();

authRouter.post("/register", controller.register);
authRouter.post("/login", controller.login);
authRouter.get("/me", requireAuth, controller.me);
