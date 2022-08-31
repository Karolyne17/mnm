export class Travels {
    constructor(
        public id?: number,
        public latStart?: number,
        public longStart?: number,
        public dateStart?: Date,
        public latArrival?: number,
        public longArrival?: number,
        public smoker?: boolean,
        public airconditionning?: boolean,
        public searchingZone?: string,
        public createdAt?: Date,
        public updatedAt?: Date,
        public deletedAt?: Date,
    ){}
}
