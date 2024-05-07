import { ObjectId } from 'mongodb';
import validateCredentials from './validateCredentials';
import checkPasswordMatch from './checkPasswordMatch';
import deleteUserFromDatabase from './deleteUserFromDatabase';

interface credentialsInput {
  password: string;
}

interface userInput {
  _id: ObjectId;
  password: string;
  provider: string;
}

const deleteUser = async (user: userInput, credentials: credentialsInput) => {
  if (user.provider === 'local') {
    credentials = validateCredentials(credentials);

    const confirmationPassword = credentials.password;
    const usrePasswordHash = user.password;

    await checkPasswordMatch(confirmationPassword, usrePasswordHash);
  }

  const userId = user._id;
  const result = await deleteUserFromDatabase(userId);
  return result;
};

export default deleteUser;
