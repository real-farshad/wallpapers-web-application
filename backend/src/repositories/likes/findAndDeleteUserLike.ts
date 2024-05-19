import { ObjectId } from 'mongodb';
import getLikesCollection from './getLikesCollection';

const findAndDeleteUserLike = async (wallpaperId: ObjectId, userId: ObjectId): Promise<boolean> => {
  const likesCollection = await getLikesCollection();
  const result = await likesCollection.deleteOne({ wallpaperId, userId });

  const success = result.deletedCount === 1;
  if (success) return true;
  return false;
};

export default findAndDeleteUserLike;
