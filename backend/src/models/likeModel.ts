import { ObjectId } from 'mongodb';

export interface Like {
  _id?: ObjectId;
  wallpaperId: ObjectId;
  userId: ObjectId;
  createdAt: number;
}
