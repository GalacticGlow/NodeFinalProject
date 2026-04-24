import { z } from "zod";
export declare const createBookingSchema: z.ZodObject<{
    roomId: z.ZodString;
    stayStartDate: z.ZodCoercedDate<unknown>;
    stayEndDate: z.ZodCoercedDate<unknown>;
}, z.core.$strip>;
//# sourceMappingURL=bookingSchema.d.ts.map