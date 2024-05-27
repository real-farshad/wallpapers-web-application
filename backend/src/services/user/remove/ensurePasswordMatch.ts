import bcrypt from 'bcryptjs';
import { CustomError } from '@utils/CustomError';

const ensurePasswordMatch = async (password: string, hash: string) => {
  const hasCorrectPassword = await bcrypt.compare(password, hash);

  if (!hasCorrectPassword) {
    const errorStatus = 401;
    const errorMessage = 'Wrong password!';
    throw new CustomError(errorStatus, errorMessage);
  }
};

export default ensurePasswordMatch;
