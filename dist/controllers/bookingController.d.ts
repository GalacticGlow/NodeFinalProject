import type { Request, Response } from "express";
type BookingParams = {
    id: string;
};
export declare function getBookings(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function createBooking(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function returnBooking(req: Request<BookingParams>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=bookingController.d.ts.map