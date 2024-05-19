import { ObjectId } from 'mongodb';

export interface Comment {
  _id?: ObjectId;
  text: string;
  createdAt: number;
  wallpaperId: ObjectId;
  publisherId: ObjectId;
}
