import { ObjectId } from 'mongodb';
import getWallpapersCollection from './getWallpapersCollection';
import { Wallpaper } from '@src/models/wallpaperModel';

const findWallpaperById = async (id: ObjectId): Promise<Wallpaper | undefined> => {
  const wallpapersCollection = await getWallpapersCollection();
  const wallpaper = await wallpapersCollection.findOne({ _id: id });
  return wallpaper;
};

export default findWallpaperById;
