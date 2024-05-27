import express, { Router } from 'express';

import {
  createCategory,
  searchCategories,
  updateCategory,
  removeCategory,
} from '@src/api/controllers/categoriesController';

const router: Router = express.Router();

router.post('/', createCategory);
router.get('/', searchCategories);
router.put('/:id', updateCategory);
router.delete('/:id', removeCategory);

export default router;
