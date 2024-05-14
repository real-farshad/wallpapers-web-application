import express, { Router } from 'express';
import { authenticateUser } from '../middleware/authenticateUser';
import { handlePostCollection } from '../controllers/collectionsController';

const router: Router = express.Router();

router.post('/', authenticateUser, handlePostCollection);

export default router;
