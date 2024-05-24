import bcrypt from 'bcryptjs';

const checkPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export default checkPassword;
