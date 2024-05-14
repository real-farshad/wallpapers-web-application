import { ObjectId } from 'mongodb';
import { likeInput } from '.';

const refineLikeData = (like: likeInput, userId: ObjectId) => {
  const finalizedLike = {
    ...like,
    wallpaperId: new ObjectId(like.wallpaperId),
    userId,
    createdAt: Date.now(),
  };

  return finalizedLike;
};

export default refineLikeData;
