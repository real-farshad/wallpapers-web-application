import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';
import findUserLikes from '@src/repositories/likes/findUserLikes';
import validateLikesQuery from './validateLikesQuery';

export interface LikesQuery {
  page?: number;
  limit?: number;
}

const search = async (query: LikesQuery, user: User) => {
  query = validateLikesQuery(query);

  const userId = user._id as ObjectId;
  const result = await findUserLikes(userId, query);

  return result;
};

export default search;
