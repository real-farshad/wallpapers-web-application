import express, { Router } from 'express';
import { authenticateUser } from '../middleware/authenticateUser';

import {
  removeComment,
  createComment,
  updateComment,
} from '@src/api/controllers/commentsController';

const router: Router = express.Router();

router.post('/', authenticateUser, createComment);
router.put('/:id', authenticateUser, updateComment);
router.delete('/:id', authenticateUser, removeComment);

export default router;
