import { Request, Response } from 'express';
import { catchAsync } from '@utils/catchAsync';
import createCollectionItem from '@src/services/collectionItems/createCollectionItem';
import searchCollectionWallpapers from '@src/services/collectionItems/searchCollectionWallpapers';
import deleteCollectionItem from '@src/services/collectionItems/deleteCollectionItem';
import { User } from '@src/models/userModel';

const handlePostCollectionItem = catchAsync(async (req: Request, res: Response) => {
  const collectionItem = req.body;
  const user = req.user as User;

  const savedUser = await createCollectionItem(collectionItem, user);
  return savedUser;
});

const handleGetCollectionItemsSearch = catchAsync(async (req: Request, res: Response) => {
  const collectionId = req.params.id;
  const query = req.query;
  const user = req.user as User;

  const collectionWallpapers = await searchCollectionWallpapers(collectionId, query, user);
  return collectionWallpapers;
});

const handleDeleteCollectionItem = catchAsync(async (req: Request, res: Response) => {
  const collectionItemId = req.params.id;
  const user = req.user as User;

  const result = await deleteCollectionItem(collectionItemId, user);
  return result;
});

export { handlePostCollectionItem, handleGetCollectionItemsSearch, handleDeleteCollectionItem };
