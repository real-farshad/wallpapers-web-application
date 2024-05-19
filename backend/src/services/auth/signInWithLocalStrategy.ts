import { VerifyFunction } from 'passport-local';
import { checkPassword } from '@utils/checkPassword';
import findUserByEmail from '@repositories/auth/findUserByEmail';
import { CustomError } from '@src/utils/CustomError';

const localStrategyOptions = { usernameField: 'email', passwordField: 'password' };

const signInWithLocalStrategy: VerifyFunction = async (email, password, done) => {
  const user = await findUserByEmail(email);
  if (!user) throw new CustomError(400, 'Incorrect email or password.');

  const hasCorrectPassword = await checkPassword(password, user.password as string);
  if (!hasCorrectPassword) throw new CustomError(400, 'Incorrect email or password.');

  return done(null, user);
};

export { localStrategyOptions, signInWithLocalStrategy };
