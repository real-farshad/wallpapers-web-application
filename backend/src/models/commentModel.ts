import { ObjectId } from 'mongodb';

export interface Comment {
  _id?: ObjectId;
  text: string;
  createdAt: number;
  wallpaperId: ObjectId;
  publisherId: ObjectId;
}

export interface CommentPayload {
  wallpaperId: string;
  text: string;
}

export interface CommentUpdate {
  text: string;
}
