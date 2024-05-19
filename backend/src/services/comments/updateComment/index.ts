import { User } from '@src/models/userModel';
import validateCommentId from './validateCommentId';
import validateCommentUpdate from './validateCommentUpdate';
import checkCommentExist from './checkCommentExist';
import checkUserIsPublisher from './checkUserIsPublisher';
import updateCommentInDatabase from './updateCommentInDatabase';

export interface CommentUpdate {
  text: string;
}

const updateComment = async (commentId: string, update: CommentUpdate, user: User) => {
  commentId = validateCommentId(commentId);

  update = validateCommentUpdate(update);

  const comment = await checkCommentExist(commentId);

  checkUserIsPublisher(comment, user);

  const updatedComment = await updateCommentInDatabase(commentId, update);
  return updatedComment;
};

export default updateComment;
