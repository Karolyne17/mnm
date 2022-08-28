export class Users {
  constructor(
    public id?: number,
    public password?: string,
    public userName?: string,
    public lastName?: string,
    public firstName?: string,
    public phoneNumber?: number,
    public email?: string,
    public photo?: string,
    public searchingZone?: string,
    public createdAt?: Date,
    public updatedAt?: Date,
    public deletedAt?: Date,
    public idAddress?: number,
    ){}
}
