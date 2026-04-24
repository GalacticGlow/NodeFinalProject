import express from "express";

import * as userController from "../controllers/userController";
import { auth, requireRole } from "../middleware/auth";

const router = express.Router();

router.get("/me", auth, userController.getMe);
router.get("/", auth, requireRole("ADMIN"), userController.getUsers);
router.get("/:id", auth, requireRole("ADMIN"), userController.getUserById);

export default router;