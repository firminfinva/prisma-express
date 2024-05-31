import { Router } from "express";
import {
  createapprenant,
  deleteapprenant,
  getapprenants,
  updateapprenant,
} from "../controlers/apprenant.controler.js";
import verifyToken from "../controlers/auth/verifyToken.js";
import verifyPermissions from "../controlers/auth/verifyPermissions.js";

export const apprenantRouter = Router();

apprenantRouter.post(
  "/createapprenant",
  verifyToken,
  verifyPermissions("coach"),
  createapprenant
);
apprenantRouter.get("/getapprenants", verifyToken, getapprenants);
apprenantRouter.put("/updateapprenant", verifyToken, updateapprenant);
apprenantRouter.delete(
  "/deleteapprenant",
  verifyToken,
  verifyPermissions("coach"),
  deleteapprenant
);
