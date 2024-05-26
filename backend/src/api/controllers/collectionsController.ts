import { Request, Response } from 'express';
import { catchAsync } from '@utils/catchAsync';
import createCollection from '@src/services/collections/createCollection';
import searchCollections from '@src/services/collections/searchCollections';
import deleteCollection from '@src/services/collections/deleteCollection';
import updateCollection from '@src/services/collections/updateCollection';
import { User } from '@src/models/userModel';

const handlePostCollection = catchAsync(async (req: Request, res: Response) => {
  const collection = req.body;
  const user = req.user as User;

  const savedCollection = await createCollection(collection, user);
  res.json(savedCollection);
});

const handleGetCollectionsSearch = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;

  const result = await searchCollections(query);
  res.json(result);
});

const handleUpdateCollection = catchAsync(async (req: Request, res: Response) => {
  const collectionId = req.params.id;
  const update = req.body;
  const user = req.user as User;

  const result = await updateCollection(collectionId, update, user);
  res.json(result);
});

const handleDeleteCollection = catchAsync(async (req: Request, res: Response) => {
  const collectionId = req.params.id;
  const user = req.user as User;

  const result = await deleteCollection(collectionId, user);
  res.json(result);
});

export {
  handlePostCollection,
  handleGetCollectionsSearch,
  handleUpdateCollection,
  handleDeleteCollection,
};
