import { Router } from "express";
import {
  createsession,
  deletesession,
  getsessions,
  updatesession,
} from "../controlers/session.controler.js";
import verifyToken from "../controlers/auth/verifyToken.js";
import verifyPermissions from "../controlers/auth/verifyPermissions.js";

export const sessionRouter = Router();

sessionRouter.post(
  "/createsession",
  verifyToken,
  verifyPermissions("coach"),
  createsession
);
sessionRouter.get(
  "/getsessions",
  verifyToken,
  verifyPermissions("coach"),
  getsessions
);
sessionRouter.put(
  "/updatesession",
  verifyToken,
  verifyPermissions("coach"),
  updatesession
);
sessionRouter.delete(
  "/deletesession",
  verifyToken,
  verifyPermissions("coach"),
  deletesession
);
