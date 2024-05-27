import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';
import validateCollectionUpdate from './validateCollectionUpdate';
import updateCollection from './updateCollection';
import ensureNewCollectionIsUnique from './ensureNewCollectionIsUnique';
import validateCollectionId from '../../common/validateCollectionId';

export interface CollectionUpdate {
  title: string;
}

const update = async (collectionId: string, update: CollectionUpdate, user: User) => {
  collectionId = validateCollectionId(collectionId);

  update = validateCollectionUpdate(update);

  const collectionTitle = update.title;
  const userId = user._id as ObjectId;
  await ensureNewCollectionIsUnique(collectionTitle, userId);

  const updatedCollection = await updateCollection(collectionId, update, userId);

  return updatedCollection;
};

export default update;
