import { Request, Response } from 'express';
import { catchAsync } from '@utils/catchAsync';

const handlePostSave = catchAsync(async (req: Request, res: Response) => {
  return res.json({ ok: true });
});

export { handlePostSave };
