import { z } from "zod";
export declare const createRoomSchema: z.ZodObject<{
    type: z.ZodEnum<{
        Standard: "Standard";
        Superior: "Superior";
        Suite: "Suite";
    }>;
    room_number: z.ZodNumber;
    available: z.ZodOptional<z.ZodBoolean>;
    price: z.ZodNumber;
}, z.core.$strip>;
export declare const replaceRoomSchema: z.ZodObject<{
    type: z.ZodEnum<{
        Standard: "Standard";
        Superior: "Superior";
        Suite: "Suite";
    }>;
    room_number: z.ZodNumber;
    price: z.ZodNumber;
    available: z.ZodBoolean;
}, z.core.$strip>;
//# sourceMappingURL=roomSchema.d.ts.map