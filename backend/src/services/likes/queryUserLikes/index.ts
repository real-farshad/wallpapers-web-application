import findUserLikes from '@src/repositories/likes/findUserLikes';
import validateQuery from './validateQuery';

export interface queryInput {
  page?: number;
  limit?: number;
}

const queryUserLikes = async (query: queryInput, user: any) => {
  query = validateQuery(query);

  const userId = user._id;
  const likedWallpapers = await findUserLikes(userId, query);

  return likedWallpapers;
};

export default queryUserLikes;
