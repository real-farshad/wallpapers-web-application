import express, { Router } from 'express';
import { authenticateUser } from '@middleware/authenticateUser';
import {
  handleDeleteLike,
  handleGetLikesCount,
  handleGetUserLikes,
  handlePostLike,
} from '@controllers/likesController';

const router: Router = express.Router();

router.post('/', authenticateUser, handlePostLike);
router.get('/', authenticateUser, handleGetUserLikes);
router.get('/count', authenticateUser, handleGetLikesCount);
router.delete('/:id', authenticateUser, handleDeleteLike);

export default router;
