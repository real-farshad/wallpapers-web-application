import findUserByEmail from '@src/repositories/auth/findUserByEmail';
import { CustomError } from '@src/utils/CustomError';

const checkUniqueUser = async (email: string) => {
  const sameUser = await findUserByEmail(email);

  if (sameUser) {
    const errorStatus = 400;
    const errorMessage = 'A user with this email address already exists!';
    throw new CustomError(errorStatus, errorMessage);
  }
};

export default checkUniqueUser;
