import { Wallpaper } from '@src/models/wallpaperModel';
import getWallpapersCollection from './getWallpapersCollection';
import { ObjectId } from 'mongodb';
import { WallpaperUpdate } from '@src/services/wallpaper/update';

const updateWallpaperById = async (
  id: ObjectId,
  update: WallpaperUpdate
): Promise<Wallpaper | undefined> => {
  const updateObject: any = {};

  // Flatten the update object to handle nested updates
  (Object.keys(update) as (keyof WallpaperUpdate)[]).forEach((key) => {
    if (typeof update[key] === 'object' && !Array.isArray(update[key]) && update[key] !== null) {
      Object.keys(update[key]!).forEach((subKey) => {
        updateObject[`${key}.${subKey}`] = (update[key] as any)[subKey];
      });
    } else {
      updateObject[key] = update[key];
    }
  });

  const wallpapersCollection = await getWallpapersCollection();
  const result = await wallpapersCollection.findOneAndUpdate(
    { _id: id },
    { $set: updateObject },
    { returnDocument: 'after' }
  );

  return result;
};

export default updateWallpaperById;
