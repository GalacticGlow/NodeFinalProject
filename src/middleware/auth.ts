import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

import type { JWTPayload } from "../types/jwt";
import CONFIG from "../config";

export interface RequestWithUser<
    P = {},
    ResBody = any,
    ReqBody = any,
    ReqQuery extends Record<string, any> = Record<string, any>,
    Locals extends Record<string, any> = Record<string, any>,
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
    user: {
        id: string;
        name?: string;
        role: "GUEST" | "ADMIN" | "RECEPTIONIST";
    };
}

export function auth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Invalid token format" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token missing from header" });
    }

    try {
        const secret = CONFIG.jwtSecret;

        if (!secret) {
            return res.status(500).json({ message: "Server misconfigured" });
        }

        const decoded = jwt.verify(token, secret as string) as unknown as JWTPayload;

        (req as RequestWithUser).user = {
            id: decoded.id,
            name: decoded.name,
            role: decoded.role,
        };

        next();
    } catch (err: any) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        }

        return res.status(401).json({ message: "Invalid token" });
    }
}

export function requireRole(...roles: RequestWithUser["user"]["role"][]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as RequestWithUser).user;

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!roles.includes(user.role)) {
            return res.status(403).json({ message: "Forbidden" });
        }

        next();
    };
}

export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return next();
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token missing from header" });
    }

    try {
        const decoded = jwt.verify(token, CONFIG.jwtSecret) as unknown as JWTPayload;
        (req as RequestWithUser).user = decoded;
    } catch (err) {
    }
    next();
};