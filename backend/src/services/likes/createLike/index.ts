import { LikePayload } from '@src/models/likeModel';
import saveLike from '@src/repositories/likes/saveLike';
import checkWallpaperExists from './checkWallpaperExists';
import checkWallpaperNotAlreadyLiked from './checkWallpaperNotAlreadyLiked';
import validateLike from './validateLike';
import refineLikeData from './refineLikeData';
import incrementWallpaperLikes from './incrementWallpaperLikes';
import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';

const createLike = async (like: LikePayload, user: User) => {
  validateLike(like);

  const wallpaperId = like.wallpaperId;
  await checkWallpaperExists(wallpaperId);

  const userId = user._id as ObjectId;
  await checkWallpaperNotAlreadyLiked(wallpaperId, userId);

  const finalizedLike = refineLikeData(like, userId);

  const savedLike = await saveLike(finalizedLike);

  await incrementWallpaperLikes(savedLike.wallpaperId);

  return savedLike;
};

export default createLike;
