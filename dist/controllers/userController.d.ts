import type { Request, Response } from "express";
type UserParams = {
    id: string;
};
export declare function getUsers(req: Request, res: Response): Promise<void>;
export declare function getUserById(req: Request<UserParams>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getMe(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=userController.d.ts.map