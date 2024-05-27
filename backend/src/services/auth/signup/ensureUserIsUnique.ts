import findUserByEmail from '@src/repositories/auth/findUserByEmail';
import { CustomError } from '@src/utils/CustomError';

const ensureUserIsUnique = async (email: string) => {
  const sameUser = await findUserByEmail(email);

  if (sameUser) {
    const errorStatus = 409;
    const errorMessage = 'A user with this email address already exists!';
    throw new CustomError(errorStatus, errorMessage);
  }
};

export default ensureUserIsUnique;
