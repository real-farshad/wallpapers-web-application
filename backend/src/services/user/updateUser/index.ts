import replaceLocalFields from './replaceLocalFields';
import replaceNoneLocalFields from './replaceNoneLocalFields';
import validateLocalUserUpdate from './validateLocalUserUpdate';
import validateNoneLocalUserUpdate from './validateNoneLocalUserUpdate';
import updateUserInDatabase from './updateUserInDatabase';
import { User } from '@src/models/userModel';

export interface UserUpdate {
  username?: string;
  email?: string;
  password?: string;
}

const updateUser = async (update: UserUpdate, user: User) => {
  const isLocalUser = user.provider === 'local';
  let updatedUser;

  if (isLocalUser) {
    update = validateLocalUserUpdate(update);
    updatedUser = replaceLocalFields(user, update);
  } else {
    update = validateNoneLocalUserUpdate(update);
    updatedUser = replaceNoneLocalFields(user, update);
  }

  updatedUser = await updateUserInDatabase(updatedUser);
  return updatedUser;
};

export default updateUser;
