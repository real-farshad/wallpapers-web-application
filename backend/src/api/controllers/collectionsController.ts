import { Request, Response } from 'express';
import { catchAsync } from '@utils/catchAsync';
import createCollection from '@src/services/collections/createCollection.ts';

const handlePostCollection = catchAsync(async (req: Request, res: Response) => {
  const collection = req.body;
  const user = req.user;

  const savedCollection = await createCollection(collection, user);
  res.json(savedCollection);
});

export { handlePostCollection };
