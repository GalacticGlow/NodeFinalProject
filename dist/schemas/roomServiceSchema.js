"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRoomServiceSchema = exports.replaceRoomServiceSchema = exports.createRoomServiceSchema = void 0;
const zod_1 = require("zod");
exports.createRoomServiceSchema = zod_1.z.object({
    roomId: zod_1.z.string().min(1),
    serviceType: zod_1.z.enum(["CLEANING", "MINIBAR_REFILL", "REPAIR"]),
    scheduledTime: zod_1.z.coerce.date(),
});
exports.replaceRoomServiceSchema = exports.createRoomServiceSchema.extend({
    status: zod_1.z.enum(["PENDING", "COMPLETED"]),
});
exports.updateRoomServiceSchema = exports.replaceRoomServiceSchema.partial();
//# sourceMappingURL=roomServiceSchema.js.map