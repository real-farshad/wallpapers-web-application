import { Request, Response } from 'express';
import { catchAsync } from '@utils/catchAsync';
import createComment from '@services/comments/createComment';

const handlePostComment = catchAsync(async (req: Request, res: Response) => {
  const comment = req.body;
  const user = req.user as any;

  const savedComment = await createComment(comment, user);
  return res.json(savedComment);
});

export { handlePostComment };
