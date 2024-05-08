import { hashPassword } from '@src/utils/hashPassword';

const addNewFields = async (user: any) => {
  console.log('Before: ', user);
  const userPassword = user.password;
  const hashedPassword = await hashPassword(userPassword);

  const finalUser = { ...user };
  finalUser.password = hashedPassword;
  finalUser.provider = 'local';

  console.log('After:', finalUser);

  return finalUser;
};

export default addNewFields;
