import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';
import findUserLikesCount from '@src/repositories/likes/findUserLikesCount';

const queryUserLikesCount = async (user: User) => {
  const userId = user._id as ObjectId;

  const likesCount = await findUserLikesCount(userId);
  return likesCount;
};
0;

export default queryUserLikesCount;
