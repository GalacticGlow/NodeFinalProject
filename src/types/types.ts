export type Room = {
    id:	string,
    type: "Standard" | "Superior" | "Suite",
    price: number,
    room_number: number,
    available:	boolean
}

export type User = {
    id:	string,
    name:	string,
    email:	string
}

export type Booking = {
    id:	string,
    userId:	string,
    roomId:	string,
    reservationDate:	Date,
    stayStartDate:	Date,
    stayEndDate:	Date | null,
    status:	"OCCUPIED" | "VACANT"
}

export type RoomService = {
    id: string,
    roomId: string,
    serviceType: "CLEANING" | "MINIBAR REFILL" | "REPAIR",
    scheduledTime: Date,
    status: "PENDING" | "COMPLETED"
}