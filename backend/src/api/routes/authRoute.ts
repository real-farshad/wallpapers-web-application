import express, { Router } from 'express';
import { authenticateUser } from '@middleware/authenticateUser';

import {
  signupUser,
  signinUser,
  signoutUser,
  handleGetGoogleOauth,
  handleGetGoogleOauthFailure,
  handleGetGoogleOauthSuccess,
} from '@src/api/controllers/authController';

const router: Router = express.Router();

router.post('/signup', signupUser);
router.post('/signin', signinUser);
router.get('/signout', authenticateUser, signoutUser);
router.get('/google', handleGetGoogleOauth);
router.get('/google/callback', handleGetGoogleOauthFailure, handleGetGoogleOauthSuccess);

export default router;
