export class Message {
  constructor(
    public id?: number,
    public message?: string,
    public createdAt?: Date,
    public updatedAt?: Date,
    public deletedAt?: Date,
    public sender_id?: number,
    public receiver_id?: number,
  ){}
}
