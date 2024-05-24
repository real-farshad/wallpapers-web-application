import express, { Router } from 'express';
import { authenticateUser } from '@middleware/authenticateUser';
import {
  handlePostSignUp,
  handlePostSignIn,
  handleGetGoogleOauth,
  handleGetGoogleOauthFailure,
  handleGetGoogleOauthSuccess,
  handleGetSignOut,
} from '@src/api/controllers/authController';

const router: Router = express.Router();

router.post('/signup', handlePostSignUp);
router.post('/signin', handlePostSignIn);
router.get('/google', handleGetGoogleOauth);
router.get('/google/callback', handleGetGoogleOauthFailure, handleGetGoogleOauthSuccess);
router.get('/signout', authenticateUser, handleGetSignOut);

export default router;
