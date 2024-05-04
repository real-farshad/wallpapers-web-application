import { ObjectId } from 'mongodb';

interface Collection {
  _id: ObjectId;
  title: string;
  createdAt: number;
  wallpaperCount: number;
  userId: ObjectId;
}

export { Collection };
