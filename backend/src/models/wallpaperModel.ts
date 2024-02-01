import { ObjectId } from 'mongodb';

interface Wallpaper {
  _id: ObjectId;
  imageUrl: {
    thumbnail: string;
    large: string;
  };
  title: string;
  likeCount: number;
  createAt: number;
  categoryId: ObjectId;
  publisherId: ObjectId;
}

export { Wallpaper };
