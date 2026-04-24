import type { Request, Response } from "express";
import prisma from "../lib/prisma";

type RoomServiceParams = {
    id: string;
};

type CreateRoomServiceBody = {
    roomId: string;
    serviceType: "CLEANING" | "MINIBAR_REFILL" | "REPAIR";
    scheduledTime: string | Date;
};

type ReplaceRoomServiceBody = {
    roomId: string;
    serviceType: "CLEANING" | "MINIBAR_REFILL" | "REPAIR";
    scheduledTime: string | Date;
    status: "PENDING" | "COMPLETED";
};

type UpdateRoomServiceBody = Partial<ReplaceRoomServiceBody>;

export async function getRoomServices(req: Request, res: Response) {
    const services = await prisma.roomService.findMany({
        include: {
            room: true,
        },
    });

    res.json({ data: services });
}

export async function getRoomServiceById(
    req: Request<RoomServiceParams>,
    res: Response
) {
    const service = await prisma.roomService.findUnique({
        where: { id: req.params.id },
        include: {
            room: true,
        },
    });

    if (!service) {
        return res.status(404).json({ error: "Room service not found" });
    }

    res.json({ data: service });
}

export async function createRoomService(
    req: Request<{}, {}, CreateRoomServiceBody>,
    res: Response
) {
    const { roomId, serviceType, scheduledTime } = req.body;

    const room = await prisma.room.findUnique({
        where: { id: roomId },
    });

    if (!room) {
        return res.status(404).json({ error: "Room not found" });
    }

    const service = await prisma.roomService.create({
        data: {
            roomId,
            serviceType,
            scheduledTime: new Date(scheduledTime),
            status: "PENDING",
        },
    });

    res.status(201).json({ data: service });
}

export async function replaceRoomService(
    req: Request<RoomServiceParams, {}, ReplaceRoomServiceBody>,
    res: Response
) {
    const { id } = req.params;
    const { roomId, serviceType, scheduledTime, status } = req.body;

    try {
        const updated = await prisma.roomService.update({
            where: { id },
            data: {
                roomId,
                serviceType,
                scheduledTime: new Date(scheduledTime),
                status,
            },
        });

        res.json({ data: updated });
    } catch {
        res.status(404).json({ error: "Room service not found" });
    }
}

export async function updateRoomService(
    req: Request<RoomServiceParams, {}, UpdateRoomServiceBody>,
    res: Response
) {
    const { id } = req.params;

    try {
        const data = Object.fromEntries(
            Object.entries({
                ...req.body,
                scheduledTime: req.body.scheduledTime
                    ? new Date(req.body.scheduledTime)
                    : undefined,
            }).filter(([_, value]) => value !== undefined)
        );

        const updated = await prisma.roomService.update({
            where: { id },
            data,
        });

        res.json({ data: updated });
    } catch {
        res.status(404).json({ error: "Room service not found" });
    }
}

export async function deleteRoomService(
    req: Request<RoomServiceParams>,
    res: Response
) {
    try {
        await prisma.roomService.delete({
            where: { id: req.params.id },
        });

        res.status(204).end();
    } catch {
        res.status(404).json({ error: "Room service not found" });
    }
}