import type { Request, Response } from "express";
import prisma from "../lib/prisma";
import type { RequestWithUser } from "../middleware/auth";

type BookingParams = {
    id: string;
};

type CreateBookingBody = {
    roomId: string;
    stayStartDate: string | Date;
    stayEndDate: string | Date;
};

export async function getBookings(req: Request, res: Response) {
    const userReq = req as RequestWithUser;

    if (userReq.user.role === "ADMIN") {
        const bookings = await prisma.booking.findMany({
            include: { room: true, user: true },
        });

        return res.json({ data: bookings });
    }

    const bookings = await prisma.booking.findMany({
        where: { userId: userReq.user.id },
        include: { room: true },
    });

    res.json({ data: bookings });
}

export async function createBooking(req: Request, res: Response) {
    const userReq = req as RequestWithUser;
    const { roomId, stayStartDate, stayEndDate } = req.body;

    const room = await prisma.room.findUnique({
        where: { id: roomId },
    });

    if (!room) {
        return res.status(404).json({ error: "Room not found" });
    }

    const overlapping = await prisma.booking.findFirst({
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

    const booking = await prisma.booking.create({
        data: {
            userId: userReq.user.id,
            roomId,
            reservationDate: new Date(),
            stayStartDate: new Date(stayStartDate),
            stayEndDate: new Date(stayEndDate),
            status: "OCCUPIED",
        },
    });

    await prisma.room.update({
        where: { id: roomId },
        data: { available: false },
    });

    res.status(201).json({ data: booking });
}

export async function returnBooking(
    req: Request<BookingParams>,
    res: Response
) {
    const { id } = req.params;

    const booking = await prisma.booking.findUnique({
        where: { id },
    });

    if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
    }

    if (booking.status === "VACANT") {
        return res.status(400).json({ error: "Booking already closed" });
    }

    const updatedBooking = await prisma.booking.update({
        where: { id },
        data: {
            status: "VACANT",
            stayEndDate: new Date(),
        },
    });

    await prisma.room.update({
        where: { id: booking.roomId },
        data: { available: true },
    });

    res.json({ data: updatedBooking });
}