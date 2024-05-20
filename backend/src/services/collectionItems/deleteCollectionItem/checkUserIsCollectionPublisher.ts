import { Collection } from '@src/models/collectionModel';
import { User } from '@src/models/userModel';
import { CustomError } from '@src/utils/CustomError';
import { ObjectId } from 'mongodb';

const checkUserIsCollectionPublisher = (colleciton: Collection, user: User) => {
  const publiserhId = colleciton.userId;
  const userId = user._id as ObjectId;

  const userIsPublisher = publiserhId.toString() === userId.toString();
  if (userIsPublisher) {
    const errorStatus = 401;
    const errorMessage = "Only Collection publisher can delete it's items!";
    throw new CustomError(errorStatus, errorMessage);
  }
};

export default checkUserIsCollectionPublisher;
