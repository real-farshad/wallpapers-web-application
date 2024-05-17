import { ObjectId } from 'mongodb';

export interface Like {
  _id?: ObjectId;
  wallpaperId: ObjectId;
  userId: ObjectId;
  createdAt: number;
}

export interface LikePayload {
  wallpaperId: string;
}

export interface LikesQuery {
  page?: number;
  limit?: number;
}
