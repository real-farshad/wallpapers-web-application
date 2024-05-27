import { Wallpaper } from '@src/models/wallpaperModel';
import getWallpapersCollection from './getWallpapersCollection';
import { ObjectId } from 'mongodb';

const insertWallpaper = async (wallpaper: Wallpaper): Promise<Wallpaper> => {
  const newWallpaper: Wallpaper = {
    ...wallpaper,
    publisherId: new ObjectId(wallpaper.publisherId),
    categoryId: new ObjectId(wallpaper.categoryId),
  };

  const wallpapersCollection = await getWallpapersCollection();

  const result = await wallpapersCollection.insertOne(newWallpaper);
  const savedWallpaper = { _id: result.insertedId, ...wallpaper };

  return savedWallpaper;
};

export default insertWallpaper;
