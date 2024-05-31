import { Router } from "express";
import {
  createcoach,
  deletecoach,
  getcoachs,
  updatecoach,
} from "../controlers/coach.controler.js";
import verifyToken from "../controlers/auth/verifyToken.js";
import verifyPermissions from "../controlers/auth/verifyPermissions.js";

export const coachRouter = Router();

coachRouter.post(
  "/createcoach",
  verifyToken,
  verifyPermissions("coach"),
  createcoach
);
coachRouter.get(
  "/getcoachs",
  verifyToken,
  verifyPermissions("coach"),
  getcoachs
);
coachRouter.put(
  "/updatecoach",
  verifyToken,
  verifyPermissions("coach"),
  updatecoach
);
coachRouter.delete(
  "/deletecoach",
  verifyToken,
  verifyPermissions("coach"),
  deletecoach
);
