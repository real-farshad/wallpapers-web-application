import queryWallpapers from '@src/repositories/wallpaper/queryWallpapers';
import validateWallpapersQuery from './validateWallpapersQuery';
import refineQueryFields from './refineQueryFields';

export interface queryInput {
  title?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

const searchWallpapers = async (query: any, user: any) => {
  query = validateWallpapersQuery(query);

  query = refineQueryFields(query);

  const userId = user ? user._id : null;
  const wallpapers = await queryWallpapers(query, userId);

  return wallpapers;
};

export default searchWallpapers;
