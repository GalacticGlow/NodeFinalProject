import { z } from "zod";

export const createBookingSchema = z.object({
    roomId: z.string().min(1),
    stayStartDate: z.coerce.date(),
    stayEndDate: z.coerce.date(),
});