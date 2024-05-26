import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';
import findUserSaves from '@src/repositories/saves/findUserSaves';
import validateQuery from './validateQuery';

export interface SavesQuery {
  page?: number;
  limit?: number;
}

const queryUserSaves = async (query: SavesQuery, user: User) => {
  query = validateQuery(query);

  const userId = user._id as ObjectId;
  const result = await findUserSaves(userId, query);

  return result;
};

export default queryUserSaves;
