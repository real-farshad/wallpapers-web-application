import express, { Router } from 'express';
import { authenticateUser } from '@middleware/authenticateUser';
import { handleDeleteLike, handlePostLike } from '@controllers/likesController';

const router: Router = express.Router();

router.post('/', authenticateUser, handlePostLike);
router.delete('/:id', authenticateUser, handleDeleteLike);

export default router;
