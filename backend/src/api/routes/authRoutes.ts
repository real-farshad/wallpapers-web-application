import express, { Router } from 'express';
import { authenticateUser } from '@middleware/authenticateUser';
import {
  handleGoogleOauthCallbackRequest,
  handleGoogleOauthRequest,
  handleGoogleOauthSuccess,
  handleSignInRequest,
  handleSignOutRequest,
  handleSignUpRequest,
} from '@controllers/authController';

const router: Router = express.Router();

router.post('/signup', handleSignUpRequest);
router.post('/signin', handleSignInRequest);
router.get('/google', handleGoogleOauthRequest);
router.get('/google/callback', handleGoogleOauthCallbackRequest, handleGoogleOauthSuccess);
router.get('/signout', authenticateUser, handleSignOutRequest);

export default router;
