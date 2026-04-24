import express from "express";

import * as loanController from "../controllers/bookingController";
import { validateBody } from "../middleware/validate";
import { createBookingSchema } from "../schemas/bookingSchema";
import { auth, requireRole } from "../middleware/auth";

const router = express.Router();

router.post(
    "/",
    auth,
    requireRole("RECEPTIONIST", "ADMIN"),
    validateBody(createBookingSchema),
    loanController.createBooking
);

router.post(
    "/:id/return",
    auth,
    requireRole("RECEPTIONIST", "ADMIN"),
    loanController.returnBooking
);

router.get(
    "/",
    auth,
    requireRole("RECEPTIONIST", "ADMIN"),
    loanController.getBookings
);

export default router;