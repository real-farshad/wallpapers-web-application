import { Comment, CommentUpdate } from '@src/models/commentModel';

const refineCommentUpdate = (comment: Comment, update: CommentUpdate) => {
  const { text } = update;

  const finalizedUpdate = {
    ...comment,
    text,
  };

  return finalizedUpdate;
};

export default refineCommentUpdate;
