import { Router } from "express";
import {
  createordinateur,
  deleteordinateur,
  getordinateurs,
  updateordinateur,
} from "../controlers/ordinateur.controler.js";
import verifyToken from "../controlers/auth/verifyToken.js";
import verifyPermissions from "../controlers/auth/verifyPermissions.js";

export const ordinateurRouter = Router();

ordinateurRouter.post(
  "/createordinateur",
  verifyToken,
  verifyPermissions("coach"),
  createordinateur
);
ordinateurRouter.get(
  "/getordinateurs",
  verifyToken,
  verifyPermissions("coach"),
  getordinateurs
);
ordinateurRouter.put(
  "/updateordinateur",
  verifyToken,
  verifyPermissions("coach"),
  updateordinateur
);
ordinateurRouter.delete(
  "/deleteordinateur",
  verifyToken,
  verifyPermissions("coach"),
  deleteordinateur
);
