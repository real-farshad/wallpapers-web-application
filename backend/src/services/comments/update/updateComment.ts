import updateCommentById from '@src/repositories/comments/updateCommentById';
import { ObjectId } from 'mongodb';
import { CommentUpdate } from '.';

const updateComment = async (commentId: string, update: CommentUpdate) => {
  const commentObjectId = new ObjectId(commentId);
  const updatedComment = await updateCommentById(commentObjectId, update);

  return updatedComment;
};

export default updateComment;
