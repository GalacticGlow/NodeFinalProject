"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = registerController;
exports.loginController = loginController;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const config_1 = __importDefault(require("../config"));
async function registerController(req, res) {
    const { name, email, password } = req.body;
    const existingUser = await prisma_1.default.user.findUnique({
        where: { email },
    });
    if (existingUser !== null) {
        return res.status(409).json({ message: "Email is already registered" });
    }
    const hashedPassword = await bcrypt_1.default.hash(password, 12);
    const userReq = req;
    const role = userReq.user?.role === "ADMIN" && req.body.role
        ? req.body.role
        : "GUEST";
    await prisma_1.default.user.create({
        data: {
            name,
            email,
            passwordHash: hashedPassword,
            role
        },
    });
    res.status(201).json({ message: "Registration completed" });
}
async function loginController(req, res) {
    const { email, password } = req.body;
    const user = await prisma_1.default.user.findUnique({
        where: { email },
    });
    if (!user) {
        return res.status(401).json({ message: "Email or password is incorrect" });
    }
    const isPasswordValid = await bcrypt_1.default.compare(password, user.passwordHash);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Email or password is incorrect" });
    }
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        name: user.name,
        role: user.role,
    }, config_1.default.jwtSecret, {
        expiresIn: config_1.default.jwtExpiresIn,
    });
    res.json({
        data: {
            accessToken: token,
        },
    });
}
//# sourceMappingURL=authController.js.map