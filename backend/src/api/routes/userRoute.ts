import express, { Router } from 'express';
import { authenticateUser } from '@middleware/authenticateUser';
import { getUserInfo, removeUser, updateUser } from '@src/api/controllers/userController';

const router: Router = express.Router();

router.get('/info', authenticateUser, getUserInfo);
router.put('/', authenticateUser, updateUser);
router.delete('/', authenticateUser, removeUser);

export default router;
