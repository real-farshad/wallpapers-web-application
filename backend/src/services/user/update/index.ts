import validateLocalUserUpdate from './validateLocalUserUpdate';
import validateOauthUserUpdate from './validateOauthUserUpdate';
import updateUser from './updateUser';
import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';

export interface UserUpdate {
  username?: string;
  email?: string;
  password?: string;
}

const update = async (update: UserUpdate, user: User) => {
  const isLocalUser = user.provider === 'local';

  if (isLocalUser) update = validateLocalUserUpdate(update);
  else update = validateOauthUserUpdate(update);

  const userId = user._id as ObjectId;
  const updatedUser = await updateUser(userId, update);

  return updatedUser;
};

export default update;
