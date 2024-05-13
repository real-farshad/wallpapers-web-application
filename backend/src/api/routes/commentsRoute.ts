import express, { Router } from 'express';
import { authenticateUser } from '../middleware/authenticateUser';
import { handlePostComment } from '@src/api/controllers/commentsController';

const router: Router = express.Router();

router.post('/', authenticateUser, handlePostComment);

export default router;
