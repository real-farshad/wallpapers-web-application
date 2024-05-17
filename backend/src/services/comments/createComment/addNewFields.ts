import { ObjectId } from 'mongodb';
import { CommentPayload } from '@src/models/commentModel';

const addNewFields = (comment: CommentPayload, userId: ObjectId) => {
  const newComment = {
    ...comment,
    createdAt: Date.now(),
    wallpaperId: new ObjectId(comment.wallpaperId),
    publisherId: userId,
  };

  return newComment;
};

export default addNewFields;
