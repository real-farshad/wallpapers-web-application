import express, { Router } from 'express';
import { authenticateUser } from '../middleware/authenticateUser';
import { handleDeleteSave, handlePostSave } from '../controllers/savesController';

const router: Router = express.Router();

router.post('/', authenticateUser, handlePostSave);
router.delete('/:id', authenticateUser, handleDeleteSave);

export default router;
