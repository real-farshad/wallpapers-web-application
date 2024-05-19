import { ObjectId } from 'mongodb';

export interface Save {
  _id?: ObjectId;
  wallpaperId: ObjectId;
  userId: ObjectId;
  createdAt: number;
}
