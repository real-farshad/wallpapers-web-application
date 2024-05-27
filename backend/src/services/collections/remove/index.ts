import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';
import removeCollection from './removeCollection';
import ensureCollectionExists from './ensureCollectionExists';
import removeCollectionItems from './removeCollectionItems';
import composeResult from './composeResult';
import validateCollectionId from '../../common/validateCollectionId';

const remove = async (collectionId: string, user: User) => {
  collectionId = validateCollectionId(collectionId);

  const userId = user._id as ObjectId;
  const collection = await ensureCollectionExists(collectionId, userId);

  const deleteCount = await removeCollectionItems(collectionId);

  await removeCollection(collectionId);

  const result = composeResult(collection, deleteCount);
  return result;
};

export default remove;
