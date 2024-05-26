import express, { Router } from 'express';
import { authenticateUser } from '../middleware/authenticateUser';
import {
  handleDeleteCollection,
  handleGetCollectionsSearch,
  handleUpdateCollection,
  handlePostCollection,
} from '../controllers/collectionsController';

const router: Router = express.Router();

router.post('/', authenticateUser, handlePostCollection);
router.get('/', handleGetCollectionsSearch);
router.put('/:id', handleUpdateCollection);
router.delete('/:id', authenticateUser, handleDeleteCollection);

export default router;
