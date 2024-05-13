import express, { Router } from 'express';
import { authenticateUser } from '../middleware/authenticateUser';

const router: Router = express.Router();

router.post('/', authenticateUser);

export default router;
