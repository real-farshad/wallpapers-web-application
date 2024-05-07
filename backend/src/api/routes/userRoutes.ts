import express, { Router } from 'express';
import { authenticateUser } from '@middleware/authenticateUser';
import {
  handleGetUserProfile,
  handleDeleteUser,
  handleUpdateUser,
} from '@src/api/controllers/userController';

const router: Router = express.Router();

router.get('/profile', authenticateUser, handleGetUserProfile);
router.put('/', authenticateUser, handleUpdateUser);
router.delete('/', authenticateUser, handleDeleteUser);

export default router;
