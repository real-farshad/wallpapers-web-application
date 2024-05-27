import { Request, Response } from 'express';
import { catchAsync } from '@utils/catchAsync';
import create from '@src/services/collections/create';
import search from '@src/services/collections/search';
import remove from '@src/services/collections/remove';
import update from '@src/services/collections/update';
import { User } from '@src/models/userModel';

const createCollection = catchAsync(async (req: Request, res: Response) => {
  const collection = req.body;
  const user = req.user as User;

  const savedCollection = await create(collection, user);
  res.status(201).json(savedCollection);
});

const searchCollections = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;

  const result = await search(query);
  res.status(200).json(result);
});

const updateCollection = catchAsync(async (req: Request, res: Response) => {
  const collectionId = req.params.id;
  const collectionUpdate = req.body;
  const user = req.user as User;

  const result = await update(collectionId, collectionUpdate, user);
  res.status(200).json(result);
});

const removeCollection = catchAsync(async (req: Request, res: Response) => {
  const collectionId = req.params.id;
  const user = req.user as User;

  const result = await remove(collectionId, user);
  res.status(204).json(result);
});

export { createCollection, searchCollections, updateCollection, removeCollection };
