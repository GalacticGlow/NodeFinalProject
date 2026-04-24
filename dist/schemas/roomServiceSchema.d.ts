import { z } from "zod";
export declare const createRoomServiceSchema: z.ZodObject<{
    roomId: z.ZodString;
    serviceType: z.ZodEnum<{
        CLEANING: "CLEANING";
        MINIBAR_REFILL: "MINIBAR_REFILL";
        REPAIR: "REPAIR";
    }>;
    scheduledTime: z.ZodCoercedDate<unknown>;
}, z.core.$strip>;
export declare const replaceRoomServiceSchema: z.ZodObject<{
    roomId: z.ZodString;
    serviceType: z.ZodEnum<{
        CLEANING: "CLEANING";
        MINIBAR_REFILL: "MINIBAR_REFILL";
        REPAIR: "REPAIR";
    }>;
    scheduledTime: z.ZodCoercedDate<unknown>;
    status: z.ZodEnum<{
        PENDING: "PENDING";
        COMPLETED: "COMPLETED";
    }>;
}, z.core.$strip>;
export declare const updateRoomServiceSchema: z.ZodObject<{
    roomId: z.ZodOptional<z.ZodString>;
    serviceType: z.ZodOptional<z.ZodEnum<{
        CLEANING: "CLEANING";
        MINIBAR_REFILL: "MINIBAR_REFILL";
        REPAIR: "REPAIR";
    }>>;
    scheduledTime: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    status: z.ZodOptional<z.ZodEnum<{
        PENDING: "PENDING";
        COMPLETED: "COMPLETED";
    }>>;
}, z.core.$strip>;
//# sourceMappingURL=roomServiceSchema.d.ts.map