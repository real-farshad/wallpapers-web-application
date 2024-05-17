import { Wallpaper, WallpaperUpdate } from '@src/models/wallpaperModel';
import { ObjectId } from 'mongodb';

interface WallpaperUpdateFinal extends WallpaperUpdate {
  categoryId?: ObjectId;
}

const replaceUpdatedFields = (wallpaper: Wallpaper, update: WallpaperUpdateFinal) => {
  const updatedWallpaper = { ...wallpaper };

  if (update.title) updatedWallpaper.title = update.title;

  if (update.image) {
    const thumbnail = update.image.thumbnail;
    if (thumbnail) updatedWallpaper.image.thumbnail = thumbnail;

    const large = update.image.large;
    if (large) updatedWallpaper.image.large = large;
  }

  if (update.categoryId) updatedWallpaper.categoryId = update.categoryId;

  return updatedWallpaper;
};

export default replaceUpdatedFields;
