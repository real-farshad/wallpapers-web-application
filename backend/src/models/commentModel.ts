import { ObjectId } from 'mongodb';

interface Comment {
  _id?: ObjectId;
  text: string;
  createdAt: number;
  wallpaperId: ObjectId;
  publisherId: ObjectId;
}

export { Comment };
