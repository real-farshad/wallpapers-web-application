import { CustomError } from '@src/utils/CustomError';
import { validateDeleteAcount } from '../validations/userValidation';
import { checkPassword } from '@src/utils/checkPassword';
import { deleteUser } from '../models/userModel';

interface deleteUserAccount {
  user: {
    password: string;
  };
  confirmationPassword: string;
}

const deleteUserAccount = async (user: any, confirmation: string) => {
  const { error, validConfirmation } = validateDeleteAcount(confirmation);
  if (error) throw new CustomError(400, error);

  const confirmationPassword = validConfirmation.password;

  const hasCorrectPassword = await checkPassword(confirmationPassword, user.password);
  if (!hasCorrectPassword) throw new CustomError(400, 'Wrong password!');

  await deleteUser(user._id);
};

export { deleteUserAccount };
