import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';
import findUserSaves from '@src/repositories/saves/findUserSaves';
import validateSavesQuery from './validateSavesQuery';

export interface SavesQuery {
  page?: number;
  limit?: number;
}

const search = async (query: SavesQuery, user: User) => {
  query = validateSavesQuery(query);

  const userId = user._id as ObjectId;
  const result = await findUserSaves(userId, query);

  return result;
};

export default search;
