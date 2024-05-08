import saveUser from '@repositories/auth/saveUser';
import checkUniqueUser from './checkUniqueUser';
import addNewFields from './addNewFields';
import validateUser from './validateUser';

const signupLocalUser = async (user: any) => {
  user = validateUser(user);

  const userEmail = user.email;
  await checkUniqueUser(userEmail);

  user = await addNewFields(user);

  const savedUser = await saveUser(user);
  return savedUser;
};

export default signupLocalUser;
