import validateSignup from './validateSignup';
import ensureUserIsUnique from './ensureUserIsUnique';
import modifySignup from './modifySignup';
import inserUser from '@repositories/auth/insertUser';

export interface UserPayload {
  username: string;
  email: string;
  password: string;
}

const signup = async (user: UserPayload) => {
  user = validateSignup(user);

  const userEmail = user.email;
  await ensureUserIsUnique(userEmail);

  const finalizedUser = await modifySignup(user);
  const savedUser = await inserUser(finalizedUser);

  return savedUser;
};

export default signup;
