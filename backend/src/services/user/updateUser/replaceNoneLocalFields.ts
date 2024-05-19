import { User } from '@src/models/userModel';
import { CustomError } from '@src/utils/CustomError';
import { UserUpdate } from '.';

const replaceNoneLocalFields = (user: User, update: UserUpdate) => {
  if (!update.username) {
    const errorStatus = 400;
    const errorMessage = 'Username is required';
    throw new CustomError(errorStatus, errorMessage);
  }

  const updatedUser = { ...user };
  updatedUser.username = update.username;
  return updatedUser;
};

export default replaceNoneLocalFields;
