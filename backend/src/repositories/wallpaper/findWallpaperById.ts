import { ObjectId } from 'mongodb';
import getWallpapersCollection from './getWallpapersCollection';
import { Wallpaper } from '@src/models/wallpaperModel';

const findWallpaperById = async (id: string): Promise<Wallpaper | undefined> => {
  const wallpapersCollection = await getWallpapersCollection();
  const wallpaper = await wallpapersCollection.findOne({ _id: new ObjectId(id) });
  return wallpaper;
};

export default findWallpaperById;
