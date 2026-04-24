"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roomRoutes_1 = __importDefault(require("./roomRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const bookingRoutes_1 = __importDefault(require("./bookingRoutes"));
const roomServiceRoutes_1 = __importDefault(require("./roomServiceRoutes"));
const auth_1 = __importDefault(require("./auth"));
const router = express_1.default.Router();
router.use("/rooms", roomRoutes_1.default);
router.use("/users", userRoutes_1.default);
router.use("/bookings", bookingRoutes_1.default);
router.use("/roomServices", roomServiceRoutes_1.default);
router.use("/auth", auth_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map