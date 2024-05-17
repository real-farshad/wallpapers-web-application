import express, { Router } from 'express';
import { authenticateUser } from '../middleware/authenticateUser';
import {
  handleDeleteCollectionItem,
  handleGetCollectionItemsSearch,
  handlePostCollectionItem,
} from '../controllers/collectionItemsController';

const router: Router = express.Router();

router.post('/', authenticateUser, handlePostCollectionItem);
router.get('/:id', handleGetCollectionItemsSearch);
router.delete('/:id', authenticateUser, handleDeleteCollectionItem);

export default router;
