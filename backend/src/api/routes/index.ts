import express, { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import categoryRoutes from './categoryRoutes';
import wallpapersRoutes from './wallpapersRoutes';

const router: Router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/category', categoryRoutes);
router.use('/wallpapers', wallpapersRoutes);

export default router;
