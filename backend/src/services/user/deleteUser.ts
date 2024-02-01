import { ObjectId } from 'mongodb';
import { User } from '@models/userModel';
import { CustomError } from '@utils/CustomError';
import { checkPassword } from '@utils/checkPassword';
import validateDeleteAcount from '@validations/user/validateDeleteAcount';
import deleteUserById from '@repositories/user/deleteUserById';

const deleteUser = async (credentials: string, user: User) => {
  const { error, validCredentials } = validateDeleteAcount(credentials);
  if (error) throw new CustomError(400, error);

  const confirmationPassword = validCredentials.password;

  const hasCorrectPassword = await checkPassword(confirmationPassword, user.password as string);
  if (!hasCorrectPassword) throw new CustomError(400, 'Wrong password!');

  await deleteUserById(user._id as ObjectId);
};

export default deleteUser;
