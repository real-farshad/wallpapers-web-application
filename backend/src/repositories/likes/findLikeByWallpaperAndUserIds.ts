import { ObjectId } from 'mongodb';
import getLikesCollection from './getLikesCollection';

const findLikeByWallpaperAndUserIds = async (wallpaperId: ObjectId, userId: ObjectId) => {
  const likesColleciton = await getLikesCollection();
  const like = await likesColleciton.findOne({ wallpaperId, userId });
  return like;
};

export default findLikeByWallpaperAndUserIds;
