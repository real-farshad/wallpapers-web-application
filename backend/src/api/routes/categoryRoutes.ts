import express, { Router } from 'express';
import { handleGetQueryCategory } from '../controllers/categoryController';

const router: Router = express.Router();

router.get('/', handleGetQueryCategory);

export default router;
