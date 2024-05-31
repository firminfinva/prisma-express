import { Router } from "express";
import {
  createcohorte,
  deletecohorte,
  getcohortes,
  updatecohorte,
} from "../controlers/cohorte.controler.js";
import verifyToken from "../controlers/auth/verifyToken.js";
import verifyPermissions from "../controlers/auth/verifyPermissions.js";

export const cohorteRouter = Router();

cohorteRouter.post(
  "/createcohorte",
  verifyToken,
  verifyPermissions("coach"),
  createcohorte
);
cohorteRouter.get(
  "/getcohortes",
  verifyToken,
  verifyPermissions("coach"),
  getcohortes
);
cohorteRouter.put(
  "/updatecohorte",
  verifyToken,
  verifyPermissions("coach"),
  updatecohorte
);
cohorteRouter.delete(
  "/deletecohorte",
  verifyToken,
  verifyPermissions("coach"),
  deletecohorte
);
