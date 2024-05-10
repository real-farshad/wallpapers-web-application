import express, { Router } from 'express';
import { handlePostWallpaper, handleDeleteWallpaper } from '../controllers/wallpapersController';
import { authenticateUser } from '../middleware/authenticateUser';

const router: Router = express.Router();

router.post('/', authenticateUser, handlePostWallpaper);
router.delete('/:id', authenticateUser, handleDeleteWallpaper);

export default router;
