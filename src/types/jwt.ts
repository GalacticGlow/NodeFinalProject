import type { JwtPayload } from "jsonwebtoken";

export interface JWTPayload extends JwtPayload {
    id: string;
    name: string;
    role: "GUEST" | "RECEPTIONIST" | "ADMIN";
}