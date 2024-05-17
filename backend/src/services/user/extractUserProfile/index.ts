import { User } from '@src/models/userModel';

const extractUserProfile = (user: User) => {
  if (user.provider === 'local') {
    const localUserProfile = {
      _id: user._id,
      username: user.username,
      email: user.email,
      provider: user.provider,
    };

    return localUserProfile;
  }

  const noneLocalUserProfile = {
    _id: user._id,
    username: user.username,
    provider: user.provider,
  };

  return noneLocalUserProfile;
};

export default extractUserProfile;
