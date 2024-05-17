import { CollectionItemPayload } from '@src/models/collectionItemModel';
import { CustomError } from '@src/utils/CustomError';

const validateCollectionItem = (collectionItem: CollectionItemPayload) => {
  const wallpaperId = collectionItem.wallpaperId;
  if (!wallpaperId) {
    const errorStatus = 400;
    const errorMessage = 'wallpaperId is required!';
    throw new CustomError(errorStatus, errorMessage);
  }

  const collectionId = collectionItem.collectionId;
  if (!collectionId) {
    const errorStatus = 400;
    const errorMessage = 'collectionId is required!';
    throw new CustomError(errorStatus, errorMessage);
  }

  const wallpaperIdTrimmed = wallpaperId.trim();
  if (!wallpaperIdTrimmed) {
    const errorStatus = 400;
    const errorMessage = 'Invalid wallpaperId!';
    throw new CustomError(errorStatus, errorMessage);
  }

  const collectionIdTrimmed = collectionId.trim();
  if (!collectionIdTrimmed) {
    const errorStatus = 400;
    const errorMessage = 'Invalid collectionId!';
    throw new CustomError(errorStatus, errorMessage);
  }
};

export default validateCollectionItem;
