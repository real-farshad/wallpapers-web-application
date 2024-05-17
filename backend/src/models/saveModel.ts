import { ObjectId } from 'mongodb';

export interface Save {
  _id?: ObjectId;
  wallpaperId: ObjectId;
  userId: ObjectId;
  createdAt: number;
}

export interface SavePayload {
  wallpaperId: string;
}

export interface SavesQuery {
  page?: number;
  limit?: number;
}
