import { ObjectId } from 'mongodb';
import getLikesCollection from './getLikesCollection';
import { Like } from '@src/models/likeModel';

const findUserLikeByWallpaperId = async (
  wallpaperId: ObjectId,
  userId: ObjectId
): Promise<Like | undefined> => {
  const likesColleciton = await getLikesCollection();
  const like = await likesColleciton.findOne({ wallpaperId, userId });
  return like;
};

export default findUserLikeByWallpaperId;
