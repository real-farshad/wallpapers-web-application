import { ObjectId } from 'mongodb';
import getWallpapersCollection from './getWallpapersCollection';

const findWallpaperById = async (id: string) => {
  const wallpapersCollection = await getWallpapersCollection();
  const wallpaper = await wallpapersCollection.findOne({ _id: new ObjectId(id) });
  return wallpaper;
};

export default findWallpaperById;
