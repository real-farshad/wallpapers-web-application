import { Request, Response } from 'express';
import { catchAsync } from '@utils/catchAsync';
import create from '@src/services/category/create';
import search from '@src/services/category/search';
import update from '@src/services/category/update';
import remove from '@src/services/category/remove';

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const category = req.body;

  const savedCategory = await create(category);
  return res.status(201).json(savedCategory);
});

const searchCategories = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;

  const categories = await search(query);
  return res.status(200).json(categories);
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const categoryUpdate = req.body;

  const updatedCategory = await update(id, categoryUpdate);
  return res.status(200).json(updatedCategory);
});

const removeCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await remove(id);
  return res.status(204).json(result);
});

export { createCategory, searchCategories, updateCategory, removeCategory };
