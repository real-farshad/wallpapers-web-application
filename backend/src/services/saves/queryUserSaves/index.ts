import { SavesQuery } from '@src/models/saveModel';
import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';
import findUserSaves from '@src/repositories/saves/findUserSaves';
import validateQuery from './validateQuery';

const queryUserSaves = async (query: SavesQuery, user: User) => {
  query = validateQuery(query);

  const userId = user._id as ObjectId;
  const savedWallpapers = await findUserSaves(userId, query);

  return savedWallpapers;
};

export default queryUserSaves;
