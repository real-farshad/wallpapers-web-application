import { CustomError } from '@src/utils/CustomError';

const replaceNoneLocalFields = (user: any, update: any) => {
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
