import replaceLocalFields from './replaceLocalFields';
import replaceNoneLocalFields from './replaceNoneLocalFields';
import validateLocalUserUpdate from './validateLocalUserUpdate';
import validateNoneLocalUserUpdate from './validateNoneLocalUserUpdate';
import updateUserInDatabase from './updateUserInDatabase';

interface userInput {
  username: string;
  email: string;
  password: string;
  provider: string;
}

interface updateInput {
  username: string;
  email: string;
  password: string;
}

const updateUser = async (user: userInput, update: updateInput) => {
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
