import express, { Router } from 'express';
import { authenticateUser } from '../middleware/authenticateUser';

import {
  handlePostWallpaper,
  handleGetWallpaper,
  hadnleUpdateWallpaper,
  handleDeleteWallpaper,
} from '../controllers/wallpapersController';

const router: Router = express.Router();

router.post('/', authenticateUser, handlePostWallpaper);
router.get('/:id', handleGetWallpaper);
router.put('/:id', authenticateUser, hadnleUpdateWallpaper);
router.delete('/:id', authenticateUser, handleDeleteWallpaper);

export default router;
