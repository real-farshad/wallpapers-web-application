import { ObjectId } from 'mongodb';

export interface Wallpaper {
  _id?: ObjectId;
  image: {
    thumbnail: string;
    large: string;
  };
  title: string;
  likeCount: number;
  createdAt: number;
  categoryId: ObjectId;
  publisherId: ObjectId;
}
