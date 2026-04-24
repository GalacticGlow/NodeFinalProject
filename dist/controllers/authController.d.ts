import type { Request, Response } from "express";
import { RegisterDTO, LoginDTO } from "../schemas/authSchema";
export declare function registerController(req: Request<{}, {}, RegisterDTO>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function loginController(req: Request<{}, {}, LoginDTO>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=authController.d.ts.map