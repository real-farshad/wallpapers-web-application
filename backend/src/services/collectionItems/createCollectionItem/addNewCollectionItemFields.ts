import { CollectionItem } from '@src/models/collectionItemModel';
import { ObjectId } from 'mongodb';

const addNewCollectionItemFields = async (collectionItem: CollectionItem) => {
  const newCollectionItem = {
    ...collectionItem,
    createdAt: Date.now(),
    collectionId: new ObjectId(collectionItem.collectionId),
    wallpaperId: new ObjectId(collectionItem.wallpaperId),
  };

  return newCollectionItem;
};

export default addNewCollectionItemFields;
