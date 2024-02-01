import { VerifyFunction } from 'passport-local';
import { checkPassword } from '@utils/checkPassword';
import findUserByEmail from '@repositories/auth/findUserByEmail';

const signInWithLocalStrategy: VerifyFunction = async (email, password, done) => {
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

export default signInWithLocalStrategy;
