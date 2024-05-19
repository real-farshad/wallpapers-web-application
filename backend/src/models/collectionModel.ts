import { ObjectId } from 'mongodb';

export interface Collection {
  _id?: ObjectId;
  title: string;
  createdAt: number;
  wallpaperCount: number;
  userId: ObjectId;
}
