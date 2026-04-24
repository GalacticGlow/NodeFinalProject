import type { Request, Response } from "express";
import type { RequestWithUser } from "../middleware/auth";

import prisma from "../lib/prisma";

type UserParams = {
    id: string;
};

export async function getUsers(req: Request, res: Response) {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        },
    });

    res.json({ data: users });
}

export async function getUserById(req: Request<UserParams>, res: Response) {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        },
    });

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    res.json({ data: user });
}

export async function getMe(req: Request, res: Response) {
    const userReq = req as RequestWithUser;

    const user = await prisma.user.findUnique({
        where: { id: userReq.user.id },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        },
    });

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    res.json({ data: user });
}