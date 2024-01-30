import { Request, Response } from 'express';
import { catchAsync } from '@src/utils/catchAsync';
import { queryCategories } from '../services/categoryService';

const handleGetQueryCategory = catchAsync(async (req: Request, res: Response) => {
  const query = req.body;

  const categories = await queryCategories(query);
  return res.json(categories);
});

export { handleGetQueryCategory };
