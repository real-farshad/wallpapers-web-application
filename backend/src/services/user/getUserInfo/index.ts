import { User } from '@src/models/userModel';

const getUserInfo = (user: User) => {
  let userInfo;

  if (user.provider === 'local')
    userInfo = {
      _id: user._id,
      username: user.username,
      email: user.email,
      provider: user.provider,
    };
  else
    userInfo = {
      _id: user._id,
      username: user.username,
      provider: user.provider,
    };

  return userInfo;
};

export default getUserInfo;
