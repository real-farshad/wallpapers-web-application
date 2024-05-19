import { ObjectId } from 'mongodb';
import { LikePayload } from '.';

const refineLikeData = (like: LikePayload, userId: ObjectId) => {
  const finalizedLike = {
    ...like,
    wallpaperId: new ObjectId(like.wallpaperId),
    userId,
    createdAt: Date.now(),
  };

  return finalizedLike;
};

export default refineLikeData;
