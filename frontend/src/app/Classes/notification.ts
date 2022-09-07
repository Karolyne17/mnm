export class Notification {
        constructor(
          public id?: number,
          public message?: string,
          public createdAt?: Date,
          public updatedAt?: Date,
          public deletedAt?: Date,
          public readAt?: Date,
          public user_id?: number,
        ){}
}
