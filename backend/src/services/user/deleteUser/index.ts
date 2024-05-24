import { ObjectId } from 'mongodb';
import validateCredentials from './validateCredentials';
import checkPasswordMatch from './checkPasswordMatch';
import deleteUserFromDatabase from './deleteUserFromDatabase';
import { User } from '@src/models/userModel';

export interface UserCredentials {
  password: string;
}

const deleteUser = async (credentials: UserCredentials, user: User) => {
  if (user.provider === 'local') {
    credentials = validateCredentials(credentials);

    const confirmationPassword = credentials.password;
    const usrePasswordHash = user.password as string;

    await checkPasswordMatch(confirmationPassword, usrePasswordHash);
  }

  const userId = user._id as ObjectId;
  const result = await deleteUserFromDatabase(userId);
  return result;
};

export default deleteUser;
