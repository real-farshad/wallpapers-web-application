import { ObjectId } from 'mongodb';

interface Wallpaper {
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

export { Wallpaper };
