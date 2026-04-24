import { z } from "zod";

export const createRoomServiceSchema = z.object({
    roomId: z.string().min(1),
    serviceType: z.enum(["CLEANING", "MINIBAR_REFILL", "REPAIR"]),
    scheduledTime: z.coerce.date(),
});

export const replaceRoomServiceSchema = createRoomServiceSchema.extend({
    status: z.enum(["PENDING", "COMPLETED"]),
});