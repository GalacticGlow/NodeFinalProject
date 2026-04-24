import type { Request, Response } from "express";
import prisma from "../lib/prisma";

type RoomParams = {
    id: string;
};

type CreateRoomBody = {
    type: "Standard" | "Superior" | "Suite";
    price: number;
    room_number: number;
    available?: boolean;
};

type ReplaceRoomBody = {
    type: "Standard" | "Superior" | "Suite";
    price: number;
    room_number: number;
    available: boolean;
};

type UpdateRoomBody = Partial<ReplaceRoomBody>;

export async function getRooms(req: Request, res: Response) {
    const rooms = await prisma.room.findMany();

    res.json({ data: rooms });
}

export async function getRoomById(
    req: Request<RoomParams>,
    res: Response
) {
    const room = await prisma.room.findUnique({
        where: { id: req.params.id },
    });

    if (!room) {
        return res.status(404).json({ error: "Room not found" });
    }

    res.json({ data: room });
}

export async function createRoom(
    req: Request<{}, {}, CreateRoomBody>,
    res: Response
) {
    const { type, price, room_number, available } = req.body;

    const newRoom = await prisma.room.create({
        data: {
            type,
            price,
            room_number,
            available: available ?? true,
        },
    });

    res.status(201).json({ data: newRoom });
}

export async function replaceRoom(
    req: Request<RoomParams, {}, ReplaceRoomBody>,
    res: Response
) {
    const { id } = req.params;
    const { type, price, room_number, available } = req.body;

    try {
        const updatedRoom = await prisma.room.update({
            where: { id },
            data: {
                type,
                price,
                room_number,
                available,
            },
        });

        res.json({ data: updatedRoom });
    } catch {
        res.status(404).json({ error: "Room not found" });
    }
}

export async function updateRoom(
    req: Request<RoomParams, {}, UpdateRoomBody>,
    res: Response
) {
    const { id } = req.params;

    try {
        const updatedRoom = await prisma.room.update({
            where: { id },
            data: req.body,
        });

        res.json({ data: updatedRoom });
    } catch {
        res.status(404).json({ error: "Room not found" });
    }
}

export async function deleteRoom(
    req: Request<RoomParams>,
    res: Response
) {
    try {
        await prisma.room.delete({
            where: { id: req.params.id },
        });

        res.status(204).end();
    } catch {
        res.status(404).json({ error: "Room not found" });
    }
}