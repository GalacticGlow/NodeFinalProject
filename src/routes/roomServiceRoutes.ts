import express from "express";

import * as roomServiceController from "../controllers/roomServiceController";

import { auth, requireRole } from "../middleware/auth";
import { validateBody } from "../middleware/validate";

import {
    createRoomServiceSchema,
    replaceRoomServiceSchema,
    updateRoomServiceSchema,
} from "../schemas/roomServiceSchema";

const router = express.Router();

router.post(
    "/",
    auth,
    requireRole("RECEPTIONIST", "ADMIN"),
    validateBody(createRoomServiceSchema),
    roomServiceController.createRoomService
);

router.get(
    "/",
    auth,
    requireRole("RECEPTIONIST", "ADMIN"),
    roomServiceController.getRoomServices
);

router.get(
    "/:id",
    auth,
    requireRole("RECEPTIONIST", "ADMIN"),
    roomServiceController.getRoomServiceById
);

router.put(
    "/:id",
    auth,
    requireRole("RECEPTIONIST", "ADMIN"),
    validateBody(replaceRoomServiceSchema),
    roomServiceController.replaceRoomService
);

router.patch(
    "/:id",
    auth,
    requireRole("RECEPTIONIST", "ADMIN"),
    validateBody(updateRoomServiceSchema),
    roomServiceController.updateRoomService
);

router.delete(
    "/:id",
    auth,
    requireRole("RECEPTIONIST", "ADMIN"),
    roomServiceController.deleteRoomService
);

export default router;