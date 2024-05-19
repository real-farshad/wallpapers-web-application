import { ObjectId } from 'mongodb';

export interface User {
  _id?: ObjectId;
  avatar?: string;
  username: string;
  email?: string;
  password?: string;
  provider: string;
  providerId?: string;
}
