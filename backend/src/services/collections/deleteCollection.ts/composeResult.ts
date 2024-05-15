import { Collection } from '@src/models/collectionModel';

const composeResult = (collection: Collection, deletedItemsCount: number) => {
  const collectionWallpaperCount = collection.wallpaperCount;

  const newResult = {
    success: true,
    collectionWallpaperCount,
    deletedCollectionWallpaperCount: deletedItemsCount,
  };

  return newResult;
};

export default composeResult;
