import validateLocalUserUpdate from './validateLocalUserUpdate';
import validateNoneLocalUserUpdate from './validateNoneLocalUserUpdate';
import updateUserInDatabase from './updateUserInDatabase';
import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';

export interface UserUpdate {
  username?: string;
  email?: string;
  password?: string;
}

const updateUser = async (update: UserUpdate, user: User) => {
  const isLocalUser = user.provider === 'local';

  if (isLocalUser) update = validateLocalUserUpdate(update);
  else update = validateNoneLocalUserUpdate(update);

  const userId = user._id as ObjectId;
  const updatedUser = await updateUserInDatabase(userId, update);

  return updatedUser;
};

export default updateUser;
