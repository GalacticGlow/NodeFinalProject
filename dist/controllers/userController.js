"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.getMe = getMe;
const prisma_1 = __importDefault(require("../lib/prisma"));
async function getUsers(req, res) {
    const users = await prisma_1.default.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        },
    });
    res.json({ data: users });
}
async function getUserById(req, res) {
    const { id } = req.params;
    const user = await prisma_1.default.user.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        },
    });
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    res.json({ data: user });
}
async function getMe(req, res) {
    const userReq = req;
    const user = await prisma_1.default.user.findUnique({
        where: { id: userReq.user.id },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        },
    });
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    res.json({ data: user });
}
//# sourceMappingURL=userController.js.map