import express, { Router } from 'express';
import {
  handlePostCreateCategory,
  handleGetQueryCategories,
  handleUpdateCategory,
  handleDeleteCategory,
} from '@src/api/controllers/categoryController';

const router: Router = express.Router();

router.post('/', handlePostCreateCategory);
router.get('/', handleGetQueryCategories);
router.put('/:id', handleUpdateCategory);
router.delete('/:id', handleDeleteCategory);

export default router;
