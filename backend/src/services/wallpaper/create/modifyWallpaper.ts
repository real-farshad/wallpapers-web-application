import { ObjectId } from 'mongodb';
import { User } from '@src/models/userModel';
import { Category } from '@src/models/categoryModel';
import { WallpaperPayload } from '.';

const modifyWallpaper = (wallpaper: WallpaperPayload, category: Category, user: User) => {
  const newWallpaper = {
    title: wallpaper.title,
    image: wallpaper.image,
    publisherId: user._id as ObjectId,
    categoryId: category._id as ObjectId,
    likeCount: 0,
    createdAt: Date.now(),
  };

  return newWallpaper;
};

export default modifyWallpaper;
