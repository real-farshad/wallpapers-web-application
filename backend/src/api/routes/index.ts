import express, { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './usersRoutes';
import categoryRoutes from './categoriesRoutes';

const router: Router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);

export default router;
