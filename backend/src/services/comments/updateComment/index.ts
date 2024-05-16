import validateCommentId from './validateCommentId';
import validateCommentUpdate from './validateCommentUpdate';
import checkCommentExist from './checkCommentExist';
import checkUserIsPublisher from './checkUserIsPublisher';
import refineCommentUpdate from './refineCommentUpdate';
import updateCommentInDatabase from './updateCommentInDatabase';

export interface updateInput {
  text: string;
}

const updateComment = async (commentId: string, update: any, user: any) => {
  commentId = validateCommentId(commentId);

  update = validateCommentUpdate(update);

  const comment = await checkCommentExist(commentId);

  checkUserIsPublisher(comment, user);

  const finalizedUpdate = refineCommentUpdate(comment, update);

  const updatedComment = await updateCommentInDatabase(finalizedUpdate);
  return updatedComment;
};

export default updateComment;
