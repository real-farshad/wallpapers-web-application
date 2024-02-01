import passport from '@config/passportConfig';
import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '@utils/catchAsync';
import { CustomError } from '@utils/CustomError';
import signUp from '@services/auth/signUp';

const handlePostSignUp = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const newUser = await signUp(user);

  res.send(newUser);
});

const handlePostSignIn = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err: any, user: any, info: any) => {
    if (err) return next(err);
    if (!user) return next(new CustomError(400, info.message));

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ success: true });
    });
  })(req, res, next);
});

const handleGetGoogleOauth = passport.authenticate('google', { scope: ['profile'] });

const handleGetGoogleOauthCallback = passport.authenticate('google', {
  failureRedirect: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : '/',
});

const handleGetGoogleOauthSuccess = (req: Request, res: Response) =>
  res.redirect(process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : '/');

const handleGetSignOut = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  req.logout({ keepSessionInfo: false }, (err) => {
    if (err) next(new CustomError(500, 'Logout failed, please try again.'));

    req.session.destroy((err) => {
      if (err) next(new CustomError(500, 'Logout failed, please try again.'));

      res.clearCookie('connect.sid');

      res.status(200).json({ message: 'Successfully logged out.' });
    });
  });
});

export {
  handlePostSignUp,
  handlePostSignIn,
  handleGetGoogleOauth,
  handleGetGoogleOauthCallback,
  handleGetGoogleOauthSuccess,
  handleGetSignOut,
};
