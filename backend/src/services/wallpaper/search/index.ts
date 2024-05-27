import findWallpapers from '@src/repositories/wallpaper/findWallpapers';
import validateWallpapersQuery from './validateWallpapersQuery';
import modifyWallpapersQuery from './modifyWallpapersQuery';
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

const search = async (query: WallpapersQuery, user?: User) => {
  query = validateWallpapersQuery(query);

  query = modifyWallpapersQuery(query);

  const userId = user && (user._id as ObjectId);
  const result = await findWallpapers(query, userId);

  return result;
};

export default search;
