import { ObjectId } from 'mongodb';
import getLikesCollection from './getLikesCollection';

const findUserLikescount = async (userId: ObjectId): Promise<number> => {
  const likesCollection = await getLikesCollection();
  const likesCount = await likesCollection.countDocuments({ userId });
  return likesCount;
};

export default findUserLikescount;
