import { ObjectId } from 'mongodb';
import { CollectionItemPayload } from '.';

const modifyCollectionItemFields = async (collectionItem: CollectionItemPayload) => {
  const newCollectionItem = {
    ...collectionItem,
    createdAt: Date.now(),
    collectionId: new ObjectId(collectionItem.collectionId),
    wallpaperId: new ObjectId(collectionItem.wallpaperId),
  };

  return newCollectionItem;
};

export default modifyCollectionItemFields;
