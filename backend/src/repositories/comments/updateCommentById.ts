import getCommentsCollection from './getCommentsCollection';
import { Comment } from '@src/models/commentModel';

const updateCommentById = async (update: Comment) => {
  const commentsCollection = await getCommentsCollection();
  const result = await commentsCollection.findOneAndUpdate(
    { _id: update._id },
    { $set: update },
    { returnDocument: 'after' }
  );

  return result;
};

export default updateCommentById;
