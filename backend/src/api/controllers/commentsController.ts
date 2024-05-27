import { Request, Response } from 'express';
import { catchAsync } from '@utils/catchAsync';
import create from '@src/services/comments/create';
import remove from '@src/services/comments/remove';
import update from '@src/services/comments/update';

const createComment = catchAsync(async (req: Request, res: Response) => {
  const comment = req.body;
  const user = req.user as any;

  const savedComment = await create(comment, user);
  return res.status(201).json(savedComment);
});

const updateComment = catchAsync(async (req: Request, res: Response) => {
  const commentId = req.params.id;
  const commentUpdate = req.body;
  const user = req.user as any;

  const updatedComment = await update(commentId, commentUpdate, user);
  return res.status(200).json(updatedComment);
});

const removeComment = catchAsync(async (req: Request, res: Response) => {
  const commentId = req.params.id;
  const user = req.user as any;

  const result = await remove(commentId, user);
  return res.status(204).json(result);
});

export { createComment, updateComment, removeComment };
