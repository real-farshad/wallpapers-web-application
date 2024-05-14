import { CustomError } from '@src/utils/CustomError';

const checkUserIsCollectionPublisher = (colleciton: any, user: any) => {
  const userIsPublisher = colleciton.publisherId.toString() === user._id.toString();

  if (userIsPublisher) {
    const errorStatus = 401;
    const errorMessage = 'Only Collection publisher can add collection items to the collection!';
    throw new CustomError(errorStatus, errorMessage);
  }
};

export default checkUserIsCollectionPublisher;
