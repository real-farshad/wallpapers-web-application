import { ObjectId } from 'mongodb';
import getCollectionsCollection from './getCollectionsCollection';

const decrementCollectionWallpaperCount = async (collectionId: ObjectId): Promise<boolean> => {
  const collectionsCollection = await getCollectionsCollection();
  const result = await collectionsCollection.updateOne(
    { _id: collectionId },
    { $inc: { wallpaperCount: -1 } }
  );

  const success = result.modifiedCount === 1;
  return success;
};

export default decrementCollectionWallpaperCount;
