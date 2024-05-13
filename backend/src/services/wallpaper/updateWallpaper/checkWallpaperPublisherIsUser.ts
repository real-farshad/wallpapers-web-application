import { CustomError } from '@src/utils/CustomError';

const checkWallpaperPublisherIsUser = (wallpaper: any, user: any) => {
  const publisherId = wallpaper.publisherId.toString();
  const userId = user._id.toString();

  const hasCorrectPublisher = publisherId === userId;

  if (!hasCorrectPublisher) {
    const errorStatus = 401;
    const errorMessage = 'Only the publisher of the wallpaper can update it!';
    throw new CustomError(errorStatus, errorMessage);
  }
};

export default checkWallpaperPublisherIsUser;
