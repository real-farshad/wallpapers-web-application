import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';
import findUserSavesCount from '@src/repositories/saves/findUserSavesCount';

const queryUserSavesCount = async (user: User) => {
  const userId = user._id as ObjectId;

  const savesCount = await findUserSavesCount(userId);
  return savesCount;
};

export default queryUserSavesCount;
