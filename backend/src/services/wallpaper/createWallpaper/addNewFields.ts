import { ObjectId } from 'mongodb';
import { User } from '@src/models/userModel';
import { WallpaperPayload } from '@src/models/wallpaperModel';
import { Category } from '@src/models/categoryModel';

const addNewFields = (wallpaper: WallpaperPayload, category: Category, user: User) => {
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

export default addNewFields;
