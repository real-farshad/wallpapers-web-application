import { CustomError } from '@src/utils/CustomError';
import { validateSignUp } from '@validations/authValidation';
import { createUser, findUserByEmail, findUserById, findUserByProviderId } from '@models/authModel';
import { hashPassword } from '@src/utils/hashPassword';
import { checkPassword } from '@src/utils/checkPassword';

interface signUpData {
  username: string;
  email: string;
  password: string;
}

const signUp = async (user: signUpData) => {
  const { error, validUser } = validateSignUp(user);
  if (error) throw new CustomError(400, error);

  const sameUser = await findUserByEmail(validUser.email);
  if (sameUser) throw new CustomError(400, 'a user with this email address already exists!');

  validUser.password = await hashPassword(validUser.password);
  validUser.provider = 'local';

  await createUser(validUser);
  return validUser;
};

const signInWithLocalStrategy = async (email: string, password: string, done: any) => {
  try {
    const user = await findUserByEmail(email);
    if (!user) return done(null, false, { message: 'Incorrect email or password.' });

    const hasCorrectPassword = await checkPassword(password, user.password);
    if (!hasCorrectPassword) return done(null, false, { message: 'Incorrect email or password.' });

    return done(null, user);
  } catch (error) {
    done(error);
  }
};

const authenticateWithGoogleStrategy = async (
  accessToken: any,
  refreshToken: any,
  profile: any,
  done: any
) => {
  try {
    const existingUser = await findUserByProviderId(profile.id);
    if (existingUser) return done(null, existingUser);

    const newUser = {
      avatar: profile._json.picture,
      username: profile._json.name,
      email: profile.email,
      provider: 'google',
      providerId: profile.id,
    };

    const insertedUser = await createUser(newUser);
    return done(null, insertedUser.ops[0]);
  } catch (error) {
    done(error);
  }
};

const serializeUser = (user: any, done: any) => {
  done(null, user._id);
};

const deserializeUser = async (id: string, done: any) => {
  try {
    const user = await findUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
};

export {
  signUp,
  signInWithLocalStrategy,
  authenticateWithGoogleStrategy,
  serializeUser,
  deserializeUser,
};
