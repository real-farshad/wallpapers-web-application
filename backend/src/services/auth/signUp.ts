import { User } from '@models/userModel';
import { CustomError } from '@utils/CustomError';
import { hashPassword } from '@utils/hashPassword';
import validateSignUp from '@validations/auth/validateSignUp';
import findUserByEmail from '@repositories/auth/findUserByEmail';
import saveUser from '@repositories/auth/saveUser';

const signUp = async (user: User) => {
  const { error, validUser } = validateSignUp(user);
  if (error) throw new CustomError(400, error);

  const sameUser = await findUserByEmail(validUser.email);
  if (sameUser) throw new CustomError(400, 'a user with this email address already exists!');

  validUser.password = await hashPassword(validUser.password);
  validUser.provider = 'local';

  const savedUser = await saveUser(validUser);
  return savedUser;
};

export default signUp;
