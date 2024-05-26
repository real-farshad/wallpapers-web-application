import queryWallpapers from '@src/repositories/wallpaper/queryWallpapers';
import validateWallpapersQuery from './validateWallpapersQuery';
import refineQueryFields from './refineQueryFields';
import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';

export interface WallpapersQuery {
  title?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

const searchWallpapers = async (query: WallpapersQuery, user?: User) => {
  query = validateWallpapersQuery(query);

  query = refineQueryFields(query);

  const userId = user && (user._id as ObjectId);
  const result = await queryWallpapers(query, userId);

  return result;
};

export default searchWallpapers;
