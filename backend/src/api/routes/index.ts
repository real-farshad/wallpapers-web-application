import express, { Router } from 'express';
import authRoute from './authRoute';
import userRoute from './userRoute';
import categoriesRoute from './categoriesRoute';
import wallpapersRoute from './wallpapersRoute';
import collectionsRoute from './collectionsRoute';
import collectionItemsRoute from './collectionItemsRoute';
import commentsRoute from './commentsRoute';
import likesRoute from './likesRoute';
import savesRoute from './savesRoute';

const router: Router = express.Router();

router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/categories', categoriesRoute);
router.use('/wallpapers', wallpapersRoute);
router.use('/collections', collectionsRoute);
router.use('/collection-items', collectionItemsRoute);
router.use('/likes', likesRoute);
router.use('/saves', savesRoute);
router.use('/comments', commentsRoute);

export default router;
