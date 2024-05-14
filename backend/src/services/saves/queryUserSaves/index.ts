import findUserSaves from '@src/repositories/saves/findUserSaves';
import validateQuery from './validateQuery';

export interface queryInput {
  page?: number;
  limit?: number;
}

const queryUserSaves = async (query: queryInput, user: any) => {
  query = validateQuery(query);

  const userId = user._id;
  const savedWallpapers = await findUserSaves(userId, query);

  return savedWallpapers;
};

export default queryUserSaves;
