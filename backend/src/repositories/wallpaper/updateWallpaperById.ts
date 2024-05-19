import { Wallpaper } from '@src/models/wallpaperModel';
import getWallpapersCollection from './getWallpapersCollection';
import { ObjectId } from 'mongodb';
import { WallpaperUpdate } from '@src/services/wallpaper/updateWallpaper';

const updateWallpaperById = async (
  id: ObjectId,
  update: WallpaperUpdate
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
