import queryWallpapers from '@src/repositories/wallpaper/queryWallpapers';
import validateWallpapersQuery from './validateWallpapersQuery';
import refineQueryFields from './refineQueryFields';
import { WallpapersQuery } from '@src/models/wallpaperModel';
import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';

const searchWallpapers = async (query: WallpapersQuery, user?: User) => {
  query = validateWallpapersQuery(query);

  query = refineQueryFields(query);

  const userId = user && (user._id as ObjectId);
  const wallpapers = await queryWallpapers(query, userId);

  return wallpapers;
};

export default searchWallpapers;
