import { ObjectId } from 'mongodb';

interface Wallpaper {
  _id?: ObjectId;
  imageUrl: {
    thumbnail: string;
    large: string;
  };
  title: string;
  likeCount: number;
  createdAt: number;
  categoryId: ObjectId;
  publisherId: ObjectId;
}

export { Wallpaper };
