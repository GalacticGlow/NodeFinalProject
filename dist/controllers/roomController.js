"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRooms = getRooms;
exports.getRoomById = getRoomById;
exports.createRoom = createRoom;
exports.replaceRoom = replaceRoom;
exports.updateRoom = updateRoom;
exports.deleteRoom = deleteRoom;
const prisma_1 = __importDefault(require("../lib/prisma"));
async function getRooms(req, res) {
    const rooms = await prisma_1.default.room.findMany();
    res.json({ data: rooms });
}
async function getRoomById(req, res) {
    const room = await prisma_1.default.room.findUnique({
        where: { id: req.params.id },
    });
    if (!room) {
        return res.status(404).json({ error: "Room not found" });
    }
    res.json({ data: room });
}
async function createRoom(req, res) {
    const { type, price, room_number, available } = req.body;
    const newRoom = await prisma_1.default.room.create({
        data: {
            type,
            price,
            room_number,
            available: available ?? true,
        },
    });
    res.status(201).json({ data: newRoom });
}
async function replaceRoom(req, res) {
    const { id } = req.params;
    const { type, price, room_number, available } = req.body;
    try {
        const updatedRoom = await prisma_1.default.room.update({
            where: { id },
            data: {
                type,
                price,
                room_number,
                available,
            },
        });
        res.json({ data: updatedRoom });
    }
    catch {
        res.status(404).json({ error: "Room not found" });
    }
}
async function updateRoom(req, res) {
    const { id } = req.params;
    try {
        const updatedRoom = await prisma_1.default.room.update({
            where: { id },
            data: req.body,
        });
        res.json({ data: updatedRoom });
    }
    catch {
        res.status(404).json({ error: "Room not found" });
    }
}
async function deleteRoom(req, res) {
    try {
        await prisma_1.default.room.delete({
            where: { id: req.params.id },
        });
        res.status(204).end();
    }
    catch {
        res.status(404).json({ error: "Room not found" });
    }
}
//# sourceMappingURL=roomController.js.map