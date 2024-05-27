import { ObjectId } from 'mongodb';
import { CommentPayload } from '.';

const modifyComment = (comment: CommentPayload, userId: ObjectId) => {
  const newComment = {
    ...comment,
    createdAt: Date.now(),
    wallpaperId: new ObjectId(comment.wallpaperId),
    userId: userId,
  };

  return newComment;
};

export default modifyComment;
