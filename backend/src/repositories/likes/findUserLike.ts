import { ObjectId } from 'mongodb';
import getLikesCollection from './getLikesCollection';

const findUserLike = async (wallpaperId: ObjectId, userId: ObjectId) => {
  const likesCollection = await getLikesCollection();
  const like = await likesCollection.findOne({ wallpaperId, userId });
  return like;
};

export default findUserLike;
