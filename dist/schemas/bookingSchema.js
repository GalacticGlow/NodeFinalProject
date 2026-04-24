"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookingSchema = void 0;
const zod_1 = require("zod");
exports.createBookingSchema = zod_1.z.object({
    roomId: zod_1.z.string().min(1),
    stayStartDate: zod_1.z.coerce.date(),
    stayEndDate: zod_1.z.coerce.date(),
});
//# sourceMappingURL=bookingSchema.js.map