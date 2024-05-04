import { Wallpaper } from '@src/models/wallpaperModel';
import getWallpapersCollection from './getWallpapersCollection';
import { ObjectId } from 'mongodb';

const saveWallpaper = async (wallpaper: any) => {
  const newWallpaper: Wallpaper = {
    ...wallpaper,
    pubisherId: new ObjectId(wallpaper.publisherId),
    categoryId: new ObjectId(wallpaper.categoryId),
  };

  const wallpapersCollection = await getWallpapersCollection();

  const result = await wallpapersCollection.insertOne(newWallpaper);
  const savedWallpaper = { _id: result.insertedId, ...wallpaper };

  return savedWallpaper;
};

export default saveWallpaper;
