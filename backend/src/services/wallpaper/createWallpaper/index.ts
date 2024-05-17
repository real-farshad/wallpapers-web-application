import saveWallpaper from '@repositories/wallpaper/saveWallpaper';
import validateWallpaper from './validateWallpaper';
import findWallpaperCategory from './findWallpaperCategory';
import addNewFields from './addNewFields';
import { WallpaperPayload } from '@src/models/wallpaperModel';
import { User } from '@src/models/userModel';

const createWallpaper = async (wallpaper: WallpaperPayload, user: User) => {
  wallpaper = validateWallpaper(wallpaper);

  const wallpaperCategoryTitle = wallpaper.category;
  const category = await findWallpaperCategory(wallpaperCategoryTitle);

  const finalWallpaper = addNewFields(wallpaper, category, user);

  const savedWallpaper = await saveWallpaper(finalWallpaper);
  return savedWallpaper;
};

export default createWallpaper;
