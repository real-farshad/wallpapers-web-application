import { ObjectId } from 'mongodb';
import deleteUserById from '@repositories/user/deleteUserById';
import { CustomError } from '@src/utils/CustomError';

const removeUser = async (userId: ObjectId) => {
  const success = await deleteUserById(userId);

  if (success) {
    const errorStatus = 500;
    const errorMessage = 'Error deleting user from database';
    throw new CustomError(errorStatus, errorMessage);
  }

  return { success: true };
};

export default removeUser;
