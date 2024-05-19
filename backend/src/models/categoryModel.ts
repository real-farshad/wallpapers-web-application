import { ObjectId } from 'mongodb';
export interface Category {
  _id?: ObjectId;
  title: string;
}
