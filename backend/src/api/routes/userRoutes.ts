import express, { Router } from 'express';
import { authenticateUser } from '@middleware/authenticateUser';
import { handleDeleteAccountRequest, handleUserProfileRequest } from '@controllers/userController';

const router: Router = express.Router();

router.get('/profile', authenticateUser, handleUserProfileRequest);
router.delete('/', authenticateUser, handleDeleteAccountRequest);

export default router;
