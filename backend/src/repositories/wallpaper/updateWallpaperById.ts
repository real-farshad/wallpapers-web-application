import { Wallpaper } from '@src/models/wallpaperModel';
import getWallpapersCollection from './getWallpapersCollection';
import { ObjectId } from 'mongodb';

interface wallpaperUpdate {
  title?: string;
  image?: {
    thumbnail?: string;
    large?: string;
  };
  category?: string;
}

const updateWallpaperById = async (
  id: ObjectId,
  update: wallpaperUpdate
): Promise<Wallpaper | undefined> => {
  const wallpapersCollection = await getWallpapersCollection();
  const result = await wallpapersCollection.findOneAndUpdate(
    { _id: id },
    { $set: update },
    { returnDocument: 'after' }
  );

  return result;
};

export default updateWallpaperById;
