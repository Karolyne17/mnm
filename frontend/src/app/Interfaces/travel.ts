export interface Travel {
    id?: number,
    latStart?: number,
    longStart?: number,
    dateStart?: Date,
    latArrival?: number,
    longArrival?: number,
    smoker?: boolean,
    airconditionning?: boolean,
    searchingZone?: string,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
}