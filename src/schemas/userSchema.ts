import { z } from "zod";

export const createUserSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    role: z.enum(["ADMIN", "USER"]).optional()
});