import { LikePayload } from '@src/models/likeModel';
import { ObjectId } from 'mongodb';

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
