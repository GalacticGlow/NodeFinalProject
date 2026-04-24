import type { Request, Response } from "express";
type RoomParams = {
    id: string;
};
type CreateRoomBody = {
    type: "Standard" | "Superior" | "Suite";
    price: number;
    room_number: number;
    available?: boolean;
};
type ReplaceRoomBody = {
    type: "Standard" | "Superior" | "Suite";
    price: number;
    room_number: number;
    available: boolean;
};
type UpdateRoomBody = Partial<ReplaceRoomBody>;
export declare function getRooms(req: Request, res: Response): Promise<void>;
export declare function getRoomById(req: Request<RoomParams>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function createRoom(req: Request<{}, {}, CreateRoomBody>, res: Response): Promise<void>;
export declare function replaceRoom(req: Request<RoomParams, {}, ReplaceRoomBody>, res: Response): Promise<void>;
export declare function updateRoom(req: Request<RoomParams, {}, UpdateRoomBody>, res: Response): Promise<void>;
export declare function deleteRoom(req: Request<RoomParams>, res: Response): Promise<void>;
export {};
//# sourceMappingURL=roomController.d.ts.map