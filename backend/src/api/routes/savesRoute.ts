import express, { Router } from 'express';
import { authenticateUser } from '../middleware/authenticateUser';
import { removeSave, searchSaves, createSave, findOneSave } from '../controllers/savesController';

const router: Router = express.Router();

router.post('/', authenticateUser, createSave);
router.get('/check/:id', authenticateUser, findOneSave);
router.get('/', authenticateUser, searchSaves);
router.delete('/:id', authenticateUser, removeSave);

export default router;
