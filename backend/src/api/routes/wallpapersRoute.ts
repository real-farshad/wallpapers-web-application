import express, { Router } from 'express';
import { authenticateUser } from '../middleware/authenticateUser';

import {
  createWallpaper,
  findOneWallpaper,
  updateWallpaper,
  removeWallpaper,
  searchWallpapers,
} from '../controllers/wallpapersController';

const router: Router = express.Router();

router.post('/', authenticateUser, createWallpaper);
router.get('/:id', findOneWallpaper);
router.get('/', searchWallpapers);
router.put('/:id', authenticateUser, updateWallpaper);
router.delete('/:id', authenticateUser, removeWallpaper);

export default router;
