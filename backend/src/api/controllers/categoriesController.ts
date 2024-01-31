import { Request, Response } from 'express';
import { catchAsync } from '@src/utils/catchAsync';
import { createCategory, deleteCategory, queryCategories } from '@services/categoriesService';

const handlePostCreateCategory = catchAsync(async (req: Request, res: Response) => {
  const category = req.body;
  const savedCategory = await createCategory(category);

  return res.json(savedCategory);
});

const handleGetQueryCategories = catchAsync(async (req: Request, res: Response) => {
  const query = req.body;

  const categories = await queryCategories(query);
  return res.json(categories);
});

const handleUpdateCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const update = req.body;

  const updatedCategory = await handleUpdateCategory(id, update);
  return res.json(updatedCategory)
});

const handleDeleteCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  await deleteCategory(id);
  return res.json({ success: true });
});

export {
  handlePostCreateCategory,
  handleGetQueryCategories,
  handleUpdateCategory,
  handleDeleteCategory,
};
