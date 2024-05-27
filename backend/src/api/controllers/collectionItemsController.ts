import { Request, Response } from 'express';
import { catchAsync } from '@utils/catchAsync';
import create from '@src/services/collectionItems/create';
import search from '@src/services/collectionItems/search';
import remove from '@src/services/collectionItems/remove';
import { User } from '@src/models/userModel';

const createCollectionItem = catchAsync(async (req: Request, res: Response) => {
  const collectionItem = req.body;
  const user = req.user as User;

  const savedUser = await create(collectionItem, user);
  return res.status(201).json(savedUser);
});

const searchCollectionItems = catchAsync(async (req: Request, res: Response) => {
  const collectionId = req.params.id;
  const query = req.query;
  const user = req.user as User;

  const collectionWallpapers = await search(collectionId, query, user);
  return res.status(200).json(collectionWallpapers);
});

const removeCollecitonItem = catchAsync(async (req: Request, res: Response) => {
  const collectionItemId = req.params.id;
  const user = req.user as User;

  const result = await remove(collectionItemId, user);
  return res.status(204).json(result);
});

export { createCollectionItem, searchCollectionItems, removeCollecitonItem };
