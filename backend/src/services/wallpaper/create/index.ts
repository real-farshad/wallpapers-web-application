import insertWallpaper from '@repositories/wallpaper/insertWallpaper';
import validateWallpaper from './validateWallpaper';
import ensureCategoryTitleExists from './ensureCategoryTitleExists';
import modifyWallpaper from './modifyWallpaper';
import { User } from '@src/models/userModel';

export interface WallpaperPayload {
  image: {
    thumbnail: string;
    large: string;
  };
  title: string;
  category: string;
}

const create = async (wallpaper: WallpaperPayload, user: User) => {
  wallpaper = validateWallpaper(wallpaper);

  const wallpaperCategoryTitle = wallpaper.category;
  const category = await ensureCategoryTitleExists(wallpaperCategoryTitle);

  const finalWallpaper = modifyWallpaper(wallpaper, category, user);

  const savedWallpaper = await insertWallpaper(finalWallpaper);
  return savedWallpaper;
};

export default create;
