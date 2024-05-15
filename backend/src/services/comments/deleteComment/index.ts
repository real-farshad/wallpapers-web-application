import validateCommentId from './validateCommentId';
import deleteCommentFromDatabase from './deleteCommentFromDatabase';

const deleteComment = async (commentId: string, user: any) => {
  commentId = validateCommentId(commentId);

  const userId = user._id;
  const result = await deleteCommentFromDatabase(commentId, userId);

  return result;
};

export default deleteComment;
