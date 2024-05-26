import express, { Router } from 'express';
import { authenticateUser } from '../middleware/authenticateUser';
import {
  handleDeleteSave,
  handleGetUserSaves,
  handlePostSave,
} from '../controllers/savesController';

const router: Router = express.Router();

router.post('/', authenticateUser, handlePostSave);
router.get('/', authenticateUser, handleGetUserSaves);
router.delete('/:id', authenticateUser, handleDeleteSave);

export default router;
