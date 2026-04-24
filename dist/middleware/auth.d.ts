import type { Request, Response, NextFunction } from "express";
export interface RequestWithUser<P = {}, ResBody = any, ReqBody = any, ReqQuery extends Record<string, any> = Record<string, any>, Locals extends Record<string, any> = Record<string, any>> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
    user: {
        id: string;
        name?: string;
        role: "GUEST" | "ADMIN" | "RECEPTIONIST";
    };
}
export declare function auth(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
export declare function requireRole(...roles: RequestWithUser["user"]["role"][]): (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.d.ts.map