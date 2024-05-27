import { ObjectId } from 'mongodb';
import validateCredentials from './validateCredentials';
import ensurePasswordMatch from './ensurePasswordMatch';
import removeUser from './removeUser';
import { User } from '@src/models/userModel';

export interface UserCredentials {
  password: string;
}

const remove = async (credentials: UserCredentials, user: User) => {
  if (user.provider === 'local') {
    credentials = validateCredentials(credentials);

    const confirmationPassword = credentials.password;
    const usrePasswordHash = user.password as string;

    await ensurePasswordMatch(confirmationPassword, usrePasswordHash);
  }

  const userId = user._id as ObjectId;
  const result = await removeUser(userId);
  return result;
};

export default remove;
