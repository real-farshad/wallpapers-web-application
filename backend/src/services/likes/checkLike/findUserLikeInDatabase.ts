import findUserLike from '@src/repositories/likes/findUserLike';
import { ObjectId } from 'mongodb';

const findUserLikeInDatabase = async (wallpaperId: string, userId: ObjectId) => {
  const wallpaperObjectId = new ObjectId(wallpaperId);
  const like = await findUserLike(wallpaperObjectId, userId);

  if (!like) return { like: false };
  return like;
};

export default findUserLikeInDatabase;
