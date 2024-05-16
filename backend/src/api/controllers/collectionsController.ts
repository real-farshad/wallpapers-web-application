import { Request, Response } from 'express';
import { catchAsync } from '@utils/catchAsync';
import createCollection from '@src/services/collections/createCollection.ts';
import countMatchingCollections from '@src/services/collections/countMatchingCollections';
import searchCollections from '@src/services/collections/searchCollections.ts';
import deleteCollection from '@src/services/collections/deleteCollection.ts';

const handlePostCollection = catchAsync(async (req: Request, res: Response) => {
  const collection = req.body;
  const user = req.user;

  const savedCollection = await createCollection(collection, user);
  res.json(savedCollection);
});

const handleGetCollectionsCount = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;

  const result = await countMatchingCollections(query);
  res.json(result);
});

const handleGetCollectionsSearch = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;

  const collections = await searchCollections(query);
  res.json(collections);
});

const handleDeleteCollection = catchAsync(async (req: Request, res: Response) => {
  const collectionId = req.params.id;
  const user = req.user;

  const result = await deleteCollection(collectionId, user);
  res.json(result);
});

export {
  handlePostCollection,
  handleGetCollectionsCount,
  handleGetCollectionsSearch,
  handleDeleteCollection,
};
