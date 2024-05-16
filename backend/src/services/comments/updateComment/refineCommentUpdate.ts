import { Comment } from '@src/models/commentModel';
import { updateInput } from '.';

const refineCommentUpdate = (comment: Comment, update: updateInput) => {
  const { text } = update;

  const finalizedUpdate = {
    ...comment,
    text,
  };

  return finalizedUpdate;
};

export default refineCommentUpdate;
