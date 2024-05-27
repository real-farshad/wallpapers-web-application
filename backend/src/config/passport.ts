import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { ObjectId } from 'mongodb';
import checkPassword from '@src/utils/checkPassword';
import findUserByEmail from '@src/repositories/auth/findUserByEmail';
import findUserByProviderId from '@src/repositories/auth/findUserByProviderId';
import insertUser from '@src/repositories/auth/insertUser';
import findUserById from '@src/repositories/auth/findUserById';
import { User } from '@src/models/userModel';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = (await findUserByEmail(email)) as User;
        if (!user) {
          return done(null, false, { message: 'Incorrect email or password!' });
        }

        const isMatch = await checkPassword(password, user.password as string);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect email or password!' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.OAUTH_CALLBACK_URL as string,
      scope: ['profile', 'email'],
    },
    async (token, tokenSecret, profile, done) => {
      try {
        let user = await findUserByProviderId(profile.id);
        if (!user) {
          user = {
            username: profile.displayName,
            provider: 'google',
            providerId: profile.id,
          };

          if (profile.photos) user.avatar = profile.photos[0].value;
          if (profile.emails) user.email = profile.emails[0].value;

          user = await insertUser(user);
        }

        return done(null, user);
      } catch (err) {
        return done(err as Error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, (user as any)._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const usreObjectId = new ObjectId(id as string);
    const user = await findUserById(usreObjectId);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
