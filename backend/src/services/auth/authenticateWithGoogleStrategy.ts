import { Profile } from 'passport';
import { VerifyFunction } from 'passport-google-oauth';
import { User } from '@models/userModel';
import findUserByProviderId from '@repositories/auth/findUserByProviderId';
import upsertUserByProviderId from '@repositories/auth/upsertUserByProviderId';

const authenticateWithGoogleStrategy = async (
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyFunction
) => {
  try {
    const existingUser = await findUserByProviderId(profile.id);
    if (existingUser) return done(null, existingUser);

    const user: User = {
      username: profile.displayName,
      provider: 'google',
      providerId: profile.id,
    };

    if (profile.photos) user.avatar = profile.photos[0].value;
    if (profile.emails) user.email = profile.emails[0].value;

    const upsertedUser = await upsertUserByProviderId(profile.id, user);
    return done(null, upsertedUser);
  } catch (error) {
    done(error);
  }
};

export default authenticateWithGoogleStrategy;
