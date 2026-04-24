import { z } from "zod";

export const createRoomSchema = z.object({
    type: z.enum(["Standard", "Superior", "Suite"]),
    room_number: z.number().int().positive(),
    available: z.boolean().optional(),
    price: z.number().int().positive()
});

export const replaceRoomSchema = createRoomSchema.extend({
    available: z.boolean(),
});