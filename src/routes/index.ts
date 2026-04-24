import express from "express";
import path from "path";

import roomRoutes from "./roomRoutes";
import userRoutes from "./userRoutes";
import bookingRoutes from "./bookingRoutes";
import roomServiceRoutes from "./roomServiceRoutes";
import authRoutes from "./auth"

const router = express.Router();

router.use("/rooms", roomRoutes);
router.use("/users", userRoutes);
router.use("/bookings", bookingRoutes);
router.use("/roomServices", roomServiceRoutes);
router.use("/auth", authRoutes)

export default router;