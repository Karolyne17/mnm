export class Bookings {
      constructor(
    public id?: number,
    public comment?: string,
    public acceptedAt?: Date,
    public refusedAt?: Date,
    public createdAt?: Date,
    public updatedAt?: Date,
    public deletedAt?: Date,
    public passenger_id?: number,
    public travel_id?: number,
    ){}
}
