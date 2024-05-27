import express, { Router } from 'express';
import { authenticateUser } from '../middleware/authenticateUser';

import {
  createCollectionItem,
  searchCollectionItems,
  removeCollecitonItem,
} from '../controllers/collectionItemsController';

const router: Router = express.Router();

router.post('/', authenticateUser, createCollectionItem);
router.get('/:id', searchCollectionItems);
router.delete('/:id', authenticateUser, removeCollecitonItem);

export default router;
