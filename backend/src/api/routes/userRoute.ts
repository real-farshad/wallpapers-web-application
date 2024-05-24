import express, { Router } from 'express';
import { authenticateUser } from '@middleware/authenticateUser';
import {
  handleGetUserInfo,
  handleDeleteUser,
  handleUpdateUser,
} from '@src/api/controllers/userController';

const router: Router = express.Router();

router.get('/info', authenticateUser, handleGetUserInfo);
router.put('/', authenticateUser, handleUpdateUser);
router.delete('/', authenticateUser, handleDeleteUser);

export default router;
