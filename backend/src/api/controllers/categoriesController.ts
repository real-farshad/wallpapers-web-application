import { Request, Response } from 'express';
import { catchAsync } from '@utils/catchAsync';
import createCategory from '@services/category/createCategory';
import queryCategories from '@services/category/queryCategories';
import updateCategory from '@services/category/updateCategory';
import deleteCategory from '@services/category/deleteCategory';

const handlePostCreateCategory = catchAsync(async (req: Request, res: Response) => {
  const category = req.body;

  const savedCategory = await createCategory(category);
  return res.json(savedCategory);
});

const handleGetQueryCategories = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;

  const categories = await queryCategories(query);
  return res.json(categories);
});

const handleUpdateCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const update = req.body;

  const updatedCategory = await updateCategory(id, update);
  return res.json(updatedCategory);
});

const handleDeleteCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await deleteCategory(id);
  return res.json(result);
});

export {
  handlePostCreateCategory,
  handleGetQueryCategories,
  handleUpdateCategory,
  handleDeleteCategory,
};
