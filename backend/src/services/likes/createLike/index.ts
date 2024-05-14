import saveLike from '@src/repositories/likes/saveLike';
import checkWallpaperExists from './checkWallpaperExists';
import checkWallpaperNotAlreadyLiked from './checkWallpaperNotAlreadyLiked';
import validateLike from './validateLike';
import refineLikeData from './refineLikeData';
import incrementWallpaperLikes from './incrementWallpaperLikes';

export interface likeInput {
  wallpaperId: string;
}

const createLike = async (like: likeInput, user: any) => {
  validateLike(like);

  const wallpaperId = like.wallpaperId;
  await checkWallpaperExists(wallpaperId);

  const userId = user._id;
  await checkWallpaperNotAlreadyLiked(wallpaperId, userId);

  const finalizedLike = refineLikeData(like, user);

  const savedLike = await saveLike(finalizedLike);

  await incrementWallpaperLikes(savedLike.wallpaperId);

  return savedLike;
};

export default createLike;
