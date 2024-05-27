import express, { Router } from 'express';
import { authenticateUser } from '../middleware/authenticateUser';

import {
  removeCollection,
  searchCollections,
  updateCollection,
  createCollection,
} from '../controllers/collectionsController';

const router: Router = express.Router();

router.post('/', authenticateUser, createCollection);
router.get('/', searchCollections);
router.put('/:id', updateCollection);
router.delete('/:id', authenticateUser, removeCollection);

export default router;
