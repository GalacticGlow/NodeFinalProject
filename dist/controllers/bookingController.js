"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookings = getBookings;
exports.createBooking = createBooking;
exports.returnBooking = returnBooking;
const prisma_1 = __importDefault(require("../lib/prisma"));
async function getBookings(req, res) {
    const userReq = req;
    if (userReq.user.role === "ADMIN") {
        const bookings = await prisma_1.default.booking.findMany({
            include: { room: true, user: true },
        });
        return res.json({ data: bookings });
    }
    const bookings = await prisma_1.default.booking.findMany({
        where: { userId: userReq.user.id },
        include: { room: true },
    });
    res.json({ data: bookings });
}
async function createBooking(req, res) {
    const userReq = req;
    const { roomId, stayStartDate, stayEndDate } = req.body;
    const room = await prisma_1.default.room.findUnique({
        where: { id: roomId },
    });
    if (!room) {
        return res.status(404).json({ error: "Room not found" });
    }
    const overlapping = await prisma_1.default.booking.findFirst({
        where: {
            roomId,
            status: "OCCUPIED",
            OR: [
                {
                    stayStartDate: {
                        lte: new Date(stayEndDate),
                    },
                    stayEndDate: {
                        gte: new Date(stayStartDate),
                    },
                },
            ],
        },
    });
    if (overlapping) {
        return res.status(400).json({ error: "Room is already booked for these dates" });
    }
    const booking = await prisma_1.default.booking.create({
        data: {
            userId: userReq.user.id,
            roomId,
            reservationDate: new Date(),
            stayStartDate: new Date(stayStartDate),
            stayEndDate: new Date(stayEndDate),
            status: "OCCUPIED",
        },
    });
    await prisma_1.default.room.update({
        where: { id: roomId },
        data: { available: false },
    });
    res.status(201).json({ data: booking });
}
async function returnBooking(req, res) {
    const { id } = req.params;
    const booking = await prisma_1.default.booking.findUnique({
        where: { id },
    });
    if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
    }
    if (booking.status === "VACANT") {
        return res.status(400).json({ error: "Booking already closed" });
    }
    const updatedBooking = await prisma_1.default.booking.update({
        where: { id },
        data: {
            status: "VACANT",
            stayEndDate: new Date(),
        },
    });
    await prisma_1.default.room.update({
        where: { id: booking.roomId },
        data: { available: true },
    });
    res.json({ data: updatedBooking });
}
//# sourceMappingURL=bookingController.js.map