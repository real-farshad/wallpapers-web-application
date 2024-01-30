import express, { Router } from 'express';
import { authenticateUser } from '@middleware/authenticateUser';
import { handleGetUserProfile, handleDeleteUser } from '@controllers/userController';

const router: Router = express.Router();

router.get('/profile', authenticateUser, handleGetUserProfile);
router.delete('/', authenticateUser, handleDeleteUser);

export default router;
