import { User } from '@src/models/userModel';
import updateUserById from '@src/repositories/user/updateUserById';
import { ObjectId } from 'mongodb';
import { UserUpdate } from '.';

const updateUser = async (userId: ObjectId, update: UserUpdate) => {
  const updatedUser = (await updateUserById(userId, update)) as User;
  if (updatedUser.provider === 'local') delete updatedUser.password;

  return updatedUser;
};

export default updateUser;
