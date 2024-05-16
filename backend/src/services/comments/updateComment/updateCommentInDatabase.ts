import { Comment } from '@src/models/commentModel';
import updateCommentById from '@src/repositories/comments/updateCommentById';

const updateCommentInDatabase = async (finalizedUpdate: Comment) => {
  const updatedComment = await updateCommentById(finalizedUpdate);

  return updatedComment;
};

export default updateCommentInDatabase;
