import saveWallpaper from '@repositories/wallpaper/saveWallpaper';
import validateWallpaper from './validateWallpaper';
import findWallpaperCategory from './findWallpaperCategory';
import addNewFields from './addNewFields';

export interface wallpaperInput {
  image: {
    thumbnail: string;
    large: string;
  };
  title: string;
  category: string;
}

export interface userInput {
  _id: string;
}

const createWallpaper = async (wallpaper: wallpaperInput, user: userInput) => {
  wallpaper = validateWallpaper(wallpaper);

  const wallpaperCategoryTitle = wallpaper.category;
  const category = await findWallpaperCategory(wallpaperCategoryTitle);

  const finalWallpaper = addNewFields(wallpaper, category, user);

  const savedWallpaper = await saveWallpaper(finalWallpaper);
  return savedWallpaper;
};

export default createWallpaper;
