import { ObjectId } from 'mongodb';
import getCommentsCollection from './getCommentsCollection';

const findCommentById = async (id: ObjectId) => {
  const commentsCollection = await getCommentsCollection();
  const comment = await commentsCollection.findOne({ _id: id });
  return comment;
};

export default findCommentById;
