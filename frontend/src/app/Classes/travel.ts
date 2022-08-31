export class Travel {
    constructor(
    public id?: number,
    public latStart?: number,
    public longStart?: number,
    public dateStart?: Date,
    public latArrival?: number,
    public longArrival?: number,
    public smoker?: number,
    public airConditionning?: number,
    public createdAt?: Date,
    public updatedAt?: Date,
    public deletedAt?: Date,
    public driver_id?: number,
    public car_id?: number,
    ){}
}

