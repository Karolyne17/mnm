export class Travel {
    constructor(
    public id?: number,
    public latStart?: number,
    public longStart?: number,
    public dateStart?: Date,
    public latArrival?: number,
    public longArrival?: number,
    public cityStart?: string,
    public cityArrival?: string,
    public smoker?: boolean,
    public airconditionning?: boolean,
    public createdAt?: Date,
    public updatedAt?: Date,
    public deletedAt?: Date,
    public driver_id?: number,
    public carId?: number,
    public price?: number,
    ){}
}

