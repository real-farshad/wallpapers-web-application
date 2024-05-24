import saveUser from '@repositories/auth/saveUser';
import checkUniqueUser from './checkUniqueUser';
import addNewFields from './addNewFields';
import validateUser from './validateUser';

export interface UserPayload {
  username: string;
  email: string;
  password: string;
}

const signupLocalUser = async (user: UserPayload) => {
  user = validateUser(user);

  const userEmail = user.email;
  await checkUniqueUser(userEmail);

  const finalizedUser = await addNewFields(user);
  const savedUser = await saveUser(finalizedUser);

  return savedUser;
};

export default signupLocalUser;
