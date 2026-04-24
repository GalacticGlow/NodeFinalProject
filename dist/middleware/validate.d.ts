import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
export declare function validateBody(schema: ZodSchema<any>): (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=validate.d.ts.map