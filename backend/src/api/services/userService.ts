import { CustomError } from '@src/utils/CustomError';
import { validateDeleteAcount } from '@validations/userValidation';
import { checkPassword } from '@src/utils/checkPassword';
import { deleteUserById } from '@models/userModel';

interface deleteUser {
  user: {
    password: string;
  };
  confirmationPassword: string;
}

const deleteUser = async (user: any, credentials: string) => {
  const { error, validCredentials } = validateDeleteAcount(credentials);
  if (error) throw new CustomError(400, error);

  const confirmationPassword = validCredentials.password;

  const hasCorrectPassword = await checkPassword(confirmationPassword, user.password);
  if (!hasCorrectPassword) throw new CustomError(400, 'Wrong password!');

  await deleteUserById(user._id);
};

export { deleteUser };
