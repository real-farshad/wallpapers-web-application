import express, { Router } from 'express';
import { authenticateUser } from '../middleware/authenticateUser';
import {
  handleDeleteCollection,
  handleGetCollectionsCount,
  handleGetCollectionsSearch,
  handlePostCollection,
} from '../controllers/collectionsController';

const router: Router = express.Router();

router.post('/', authenticateUser, handlePostCollection);
router.get('/count', handleGetCollectionsCount);
router.get('/', handleGetCollectionsSearch);
router.delete('/:id', authenticateUser, handleDeleteCollection);

export default router;
