"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoomServices = getRoomServices;
exports.getRoomServiceById = getRoomServiceById;
exports.createRoomService = createRoomService;
exports.replaceRoomService = replaceRoomService;
exports.updateRoomService = updateRoomService;
exports.deleteRoomService = deleteRoomService;
const prisma_1 = __importDefault(require("../lib/prisma"));
async function getRoomServices(req, res) {
    const services = await prisma_1.default.roomService.findMany({
        include: {
            room: true,
        },
    });
    res.json({ data: services });
}
async function getRoomServiceById(req, res) {
    const service = await prisma_1.default.roomService.findUnique({
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
async function createRoomService(req, res) {
    const { roomId, serviceType, scheduledTime } = req.body;
    const room = await prisma_1.default.room.findUnique({
        where: { id: roomId },
    });
    if (!room) {
        return res.status(404).json({ error: "Room not found" });
    }
    const service = await prisma_1.default.roomService.create({
        data: {
            roomId,
            serviceType,
            scheduledTime: new Date(scheduledTime),
            status: "PENDING",
        },
    });
    res.status(201).json({ data: service });
}
async function replaceRoomService(req, res) {
    const { id } = req.params;
    const { roomId, serviceType, scheduledTime, status } = req.body;
    try {
        const updated = await prisma_1.default.roomService.update({
            where: { id },
            data: {
                roomId,
                serviceType,
                scheduledTime: new Date(scheduledTime),
                status,
            },
        });
        res.json({ data: updated });
    }
    catch {
        res.status(404).json({ error: "Room service not found" });
    }
}
async function updateRoomService(req, res) {
    const { id } = req.params;
    try {
        const data = Object.fromEntries(Object.entries({
            ...req.body,
            scheduledTime: req.body.scheduledTime
                ? new Date(req.body.scheduledTime)
                : undefined,
        }).filter(([_, value]) => value !== undefined));
        const updated = await prisma_1.default.roomService.update({
            where: { id },
            data,
        });
        res.json({ data: updated });
    }
    catch {
        res.status(404).json({ error: "Room service not found" });
    }
}
async function deleteRoomService(req, res) {
    try {
        await prisma_1.default.roomService.delete({
            where: { id: req.params.id },
        });
        res.status(204).end();
    }
    catch {
        res.status(404).json({ error: "Room service not found" });
    }
}
//# sourceMappingURL=roomServiceController.js.map