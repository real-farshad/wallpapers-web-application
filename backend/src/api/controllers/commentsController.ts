import { Request, Response } from 'express';
import { catchAsync } from '@utils/catchAsync';
import createComment from '@services/comments/createComment';
import deleteComment from '@src/services/comments/deleteComment';
import updateComment from '@src/services/comments/updateComment';

const handlePostComment = catchAsync(async (req: Request, res: Response) => {
  const comment = req.body;
  const user = req.user as any;

  const savedComment = await createComment(comment, user);
  return res.json(savedComment);
});

const handleUpdateComment = catchAsync(async (req: Request, res: Response) => {
  const commentId = req.params.id;
  const update = req.body;
  const user = req.user as any;

  const updatedComment = await updateComment(commentId, update, user);
  return res.json(updatedComment);
});

const handleDeleteComment = catchAsync(async (req: Request, res: Response) => {
  const commentId = req.params.id;
  const user = req.user as any;

  const result = await deleteComment(commentId, user);
  return res.json(result);
});

export { handlePostComment, handleUpdateComment, handleDeleteComment };
