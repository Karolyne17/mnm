export interface Booking {
    id?: number,
    comment?: string,
    acceptedAt?: Date,
    refusedAt?: Date,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
    passengerId?: number,
    travelId?: number,
}