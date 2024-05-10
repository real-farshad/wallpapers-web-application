import { ObjectId } from 'mongodb';
import { userInput, wallpaperInput } from '.';

interface categoryInput {
  _id: ObjectId;
}

const addNewFields = (wallpaper: wallpaperInput, category: categoryInput, user: userInput) => {
  const newWallpaper = {
    title: wallpaper.title,
    image: wallpaper.image,
    publisherId: new ObjectId(user._id),
    categoryId: category._id,
    likeCount: 0,
    createdAt: Date.now(),
  };

  return newWallpaper;
};

export default addNewFields;
