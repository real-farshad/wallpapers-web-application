import { User } from '@src/models/userModel';
import { UserUpdate } from '.';

const replaceLocalFields = (user: User, update: UserUpdate) => {
  const updatedUser = { ...user };

  if (update.username) updatedUser.username = update.username;
  if (update.email) updatedUser.email = update.email;
  if (update.password) updatedUser.password = update.password;

  return updatedUser;
};

export default replaceLocalFields;
