import getWallpapersCollection from './getWallpapersCollection';
import { Wallpaper } from '@src/models/wallpaperModel';
import { ObjectId } from 'mongodb';

interface wallpaperUpdate {
  title?: string;
  image?: {
    thumbnail?: string;
    large?: string;
  };
  category?: string;
}

const updateWallpaperById = async (id: string, update: wallpaperUpdate) => {
  const wallpapersCollection = await getWallpapersCollection();
  const result = await wallpapersCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: update },
    { returnDocument: 'after' }
  );

  return result;
};

export default updateWallpaperById;
