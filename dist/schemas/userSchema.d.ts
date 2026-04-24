import { z } from "zod";
export declare const createUserSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    role: z.ZodOptional<z.ZodEnum<{
        ADMIN: "ADMIN";
        USER: "USER";
    }>>;
}, z.core.$strip>;
//# sourceMappingURL=userSchema.d.ts.map