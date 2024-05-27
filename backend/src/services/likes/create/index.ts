import insertLike from '@src/repositories/likes/insertLike';
import ensureWallpaperNotAlreadyLiked from './ensureWallpaperNotAlreadyLiked';
import validateLike from './validateLike';
import modifyLike from './modifyLike';
import incrementWallpaperLikesCount from './incrementWallpaperLikesCount';
import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';
import ensureWallpaperExists from '@src/services/common/ensureWallpaperExists';

export interface LikePayload {
  wallpaperId: string;
}

const create = async (like: LikePayload, user: User) => {
  like = validateLike(like);

  const wallpaperId = like.wallpaperId;
  await ensureWallpaperExists(wallpaperId);

  const userId = user._id as ObjectId;
  await ensureWallpaperNotAlreadyLiked(wallpaperId, userId);

  const finalizedLike = modifyLike(like, userId);

  const savedLike = await insertLike(finalizedLike);

  await incrementWallpaperLikesCount(savedLike.wallpaperId);

  return savedLike;
};

export default create;
