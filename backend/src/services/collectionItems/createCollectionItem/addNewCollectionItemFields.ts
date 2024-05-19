import { ObjectId } from 'mongodb';
import { CollectionItemPayload } from '.';

const addNewCollectionItemFields = async (collectionItem: CollectionItemPayload) => {
  const newCollectionItem = {
    ...collectionItem,
    createdAt: Date.now(),
    collectionId: new ObjectId(collectionItem.collectionId),
    wallpaperId: new ObjectId(collectionItem.wallpaperId),
  };

  return newCollectionItem;
};

export default addNewCollectionItemFields;
