import * as z from "zod";

export const registerSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required")
        .max(100, "Name must be less than 100 characters"),

    email: z
        .string()
        .email("Invalid email address"),

    password: z
        .string()
        .min(8, "Password should be between 8 and 16 characters")
        .max(16, "Password should be between 8 and 16 characters"),

    role: z
        .enum(["USER", "RECEPTIONIST", "ADMIN"]).optional()
});

export const loginSchema = z.object({
    email: z
        .string()
        .email("Invalid email address"),

    password: z
        .string()
        .min(8, "Password should be between 8 and 16 characters")
        .max(16, "Password should be between 8 and 16 characters"),
});

export type RegisterDTO = z.infer<typeof registerSchema>;
export type LoginDTO = z.infer<typeof loginSchema>;