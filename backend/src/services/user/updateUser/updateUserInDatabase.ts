import { User } from '@src/models/userModel';
import updateUserById from '@src/repositories/user/updateUserById';

const updateUserInDatabase = async (update: User) => {
  const updatedUser = (await updateUserById(update)) as User;
  if (updatedUser.provider === 'local') delete updatedUser.password;

  return updatedUser;
};

export default updateUserInDatabase;
