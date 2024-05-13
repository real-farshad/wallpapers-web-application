import validateComment from './validateComment';
import checkWallpaperExists from './checkWallpaperExists';
import addNewFields from './addNewFields';
import saveComment from '@src/repositories/comments/saveComment';

export interface commentInput {
  wallpaperId: string;
  text: string;
}

const createComments = async (comment: commentInput, user: any) => {
  comment = validateComment(comment);

  await checkWallpaperExists(comment.wallpaperId);

  const userId = user._id;
  const newComment = addNewFields(comment, userId);

  const savedComment = await saveComment(newComment);
  return savedComment;
};

export default createComments;
