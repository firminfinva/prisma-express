import { Router } from "express";
import { sessionRouter } from "./session.routes.js";
import { cohorteRouter } from "./cohorte.routes.js";
import { coachRouter } from "./coach.routes.js";
import { apprenantRouter } from "./apprenant.routes.js";
import { ordinateurRouter } from "./ordinateur.routes.js";
import { createcoach } from "../controlers/coach.controler.js";
import { Login } from "../controlers/auth/login.controler.js";
import verifyToken from "../controlers/auth/verifyToken.js";

export const mainRouter = Router();

mainRouter.post("/login", Login);
mainRouter.post("/register", createcoach);

mainRouter.use("/", sessionRouter);
mainRouter.use("/", cohorteRouter);
mainRouter.use("/", coachRouter);
mainRouter.use("/", apprenantRouter);
mainRouter.use("/", ordinateurRouter);
