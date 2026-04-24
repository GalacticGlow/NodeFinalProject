import type { Request, Response } from "express";
type RoomServiceParams = {
    id: string;
};
type CreateRoomServiceBody = {
    roomId: string;
    serviceType: "CLEANING" | "MINIBAR_REFILL" | "REPAIR";
    scheduledTime: string | Date;
};
type ReplaceRoomServiceBody = {
    roomId: string;
    serviceType: "CLEANING" | "MINIBAR_REFILL" | "REPAIR";
    scheduledTime: string | Date;
    status: "PENDING" | "COMPLETED";
};
type UpdateRoomServiceBody = Partial<ReplaceRoomServiceBody>;
export declare function getRoomServices(req: Request, res: Response): Promise<void>;
export declare function getRoomServiceById(req: Request<RoomServiceParams>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function createRoomService(req: Request<{}, {}, CreateRoomServiceBody>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function replaceRoomService(req: Request<RoomServiceParams, {}, ReplaceRoomServiceBody>, res: Response): Promise<void>;
export declare function updateRoomService(req: Request<RoomServiceParams, {}, UpdateRoomServiceBody>, res: Response): Promise<void>;
export declare function deleteRoomService(req: Request<RoomServiceParams>, res: Response): Promise<void>;
export {};
//# sourceMappingURL=roomServiceController.d.ts.map