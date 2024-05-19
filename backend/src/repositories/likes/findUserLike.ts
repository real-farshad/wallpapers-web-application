import { ObjectId } from 'mongodb';
import getLikesCollection from './getLikesCollection';
import { Like } from '@src/models/likeModel';

const findUserLike = async (wallpaperId: ObjectId, userId: ObjectId): Promise<Like | undefined> => {
  const likesCollection = await getLikesCollection();
  const like = await likesCollection.findOne({ wallpaperId, userId });
  return like;
};

export default findUserLike;
