import { catchAsync } from '@utils/catchAsync';
import { Request, Response, NextFunction } from 'express';
import passport from '@config/passportConfig';
import signupLocalUser from '@src/services/auth/signupLocalUser';
import signinLocalUser from '@src/services/auth/signinLocalUser';
import signout from '@src/services/auth/signout';

const handlePostSignUp = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const savedUser = await signupLocalUser(user);

  res.send(savedUser);
});

const handlePostSignIn = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await signinLocalUser(req, res, next);
  res.send(result);
});

const handleGetGoogleOauth = passport.authenticate('google', { scope: ['profile'] });

const handleGetGoogleOauthCallback = passport.authenticate('google', {
  failureRedirect: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : '/',
});

const handleGetGoogleOauthSuccess = (req: Request, res: Response) => {
  const devRedirectURL = 'http://localhost:3000/';
  const prodRedirectURL = '/';

  const isDevEnvironment = process.env.NODE_ENV === 'development';
  res.redirect(isDevEnvironment ? devRedirectURL : prodRedirectURL);
};

const handleGetSignOut = catchAsync(async (req: Request, res: Response) => {
  const result = await signout(req, res);
  res.send(result);
});

export {
  handlePostSignUp,
  handlePostSignIn,
  handleGetGoogleOauth,
  handleGetGoogleOauthCallback,
  handleGetGoogleOauthSuccess,
  handleGetSignOut,
};
