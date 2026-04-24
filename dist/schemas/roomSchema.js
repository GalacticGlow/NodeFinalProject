"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceRoomSchema = exports.createRoomSchema = void 0;
const zod_1 = require("zod");
exports.createRoomSchema = zod_1.z.object({
    type: zod_1.z.enum(["Standard", "Superior", "Suite"]),
    room_number: zod_1.z.number().int().positive(),
    available: zod_1.z.boolean().optional(),
    price: zod_1.z.number().int().positive()
});
exports.replaceRoomSchema = exports.createRoomSchema.extend({
    available: zod_1.z.boolean(),
});
//# sourceMappingURL=roomSchema.js.map