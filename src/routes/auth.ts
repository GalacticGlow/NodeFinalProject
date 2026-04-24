import express from "express";

import {
    registerController,
    loginController
} from "../controllers/authController";

import { validateBody } from "../middleware/validate";
import { registerSchema, loginSchema } from "../schemas/authSchema";
import { optionalAuth } from "../middleware/auth";

const router = express.Router();

router.post(
    "/register",
    optionalAuth,
    validateBody(registerSchema),
    registerController,
);

router.post("/login", validateBody(loginSchema), loginController);

export default router;