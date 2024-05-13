import { ObjectId } from 'mongodb';
import { commentInput } from '.';

const addNewFields = (comment: commentInput, userId: ObjectId) => {
  const newComment = {
    ...comment,
    createdAt: Date.now(),
    wallpaperId: new ObjectId(comment.wallpaperId),
    publisherId: userId,
  };

  return newComment;
};

export default addNewFields;
