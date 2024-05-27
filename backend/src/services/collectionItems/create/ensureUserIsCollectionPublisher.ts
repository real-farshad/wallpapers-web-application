import { Collection } from '@src/models/collectionModel';
import { User } from '@src/models/userModel';
import { CustomError } from '@src/utils/CustomError';
import { ObjectId } from 'mongodb';

const ensureUserIsCollectionPublisher = (colleciton: Collection, user: User) => {
  const publiserhId = colleciton.publisherId;
  const userId = user._id as ObjectId;

  const userIsPublisher = publiserhId.toString() === userId.toString();
  if (userIsPublisher) {
    const errorStatus = 403;
    const errorMessage = 'Only Collection publisher can add collection items to the collection!';
    throw new CustomError(errorStatus, errorMessage);
  }
};

export default ensureUserIsCollectionPublisher;
