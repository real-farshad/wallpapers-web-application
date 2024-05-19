import { Comment } from '@src/models/commentModel';
import { CommentUpdate } from '.';

const refineCommentUpdate = (comment: Comment, update: CommentUpdate) => {
  const { text } = update;

  const finalizedUpdate = {
    ...comment,
    text,
  };

  return finalizedUpdate;
};

export default refineCommentUpdate;
