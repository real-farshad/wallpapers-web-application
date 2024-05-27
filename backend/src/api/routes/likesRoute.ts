import express, { Router } from 'express';
import { authenticateUser } from '@middleware/authenticateUser';
import { removeLike, findOneLike, searchLikes, createLike } from '@controllers/likesController';

const router: Router = express.Router();

router.post('/', authenticateUser, createLike);
router.get('/check/:id', authenticateUser, findOneLike);
router.get('/', authenticateUser, searchLikes);
router.delete('/:id', authenticateUser, removeLike);

export default router;
