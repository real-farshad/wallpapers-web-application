import bcrypt from 'bcryptjs';
import { CustomError } from '@utils/CustomError';

const checkPasswordMatch = async (password: string, hash: string) => {
  const hasCorrectPassword = await bcrypt.compare(password, hash);

  if (!hasCorrectPassword) {
    const errorStatus = 400;
    const errorMessage = 'Wrong password!';
    throw new CustomError(errorStatus, errorMessage);
  }
};

export default checkPasswordMatch;
