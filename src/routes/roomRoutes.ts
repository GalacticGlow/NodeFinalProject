import express from "express";

import * as bookController from "../controllers/roomController";
import {
    createRoomSchema,
    replaceRoomSchema
} from "../schemas/roomSchema";
import { validateBody } from "../middleware/validate";
import { auth, requireRole } from "../middleware/auth";

const router = express.Router();

router.get("/", bookController.getRooms);
router.get("/:id", bookController.getRoomById);

router.post(
    "/",
    auth,
    requireRole("ADMIN"),
    validateBody(createRoomSchema),
    bookController.createRoom
);

router.put(
    "/:id",
    auth,
    requireRole("ADMIN"),
    validateBody(replaceRoomSchema),
    bookController.replaceRoom
);

router.delete(
    "/:id",
    auth,
    requireRole("ADMIN"),
    bookController.deleteRoom
);

export default router;