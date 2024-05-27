import { ObjectId } from 'mongodb';
import { LikePayload } from '.';

const modifyLike = (like: LikePayload, userId: ObjectId) => {
  const finalizedLike = {
    ...like,
    wallpaperId: new ObjectId(like.wallpaperId),
    userId,
    createdAt: Date.now(),
  };

  return finalizedLike;
};

export default modifyLike;
