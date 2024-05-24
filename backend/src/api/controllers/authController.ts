import { catchAsync } from '@utils/catchAsync';
import { Request, Response, NextFunction } from 'express';
import passport from '@config/passport';
import signupLocalUser from '@src/services/auth/signupLocalUser';
import validateSignin from '@src/services/auth/validateSignin';

const handlePostSignUp = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const savedUser = await signupLocalUser(user);

  res.send(savedUser);
});

const handlePostSignIn = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  let user = req.body;
  user = validateSignin(user);
  req.body = user;

  passport.authenticate(
    'local',
    (err: Error | null, user: Express.User | false, info: { message: string }) => {
      if (err) return next(err);

      if (!user) {
        return res.status(401).json({ error: info ? info.message : 'Authentication failed' });
      }

      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }

        return res.json({ success: true });
      });
    }
  )(req, res, next);
});

const handleGetSignOut = (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }

      res.clearCookie('connect.sid');
      res.json({ message: 'User logged out successfully.' });
    });
  });
};

const handleGetGoogleOauth: () => void = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

const handleGetGoogleOauthFailure: () => void = passport.authenticate('google', {
  failureRedirect:
    process.env.NODE_ENV === 'development'
      ? process.env.OAUTH_CALLBACK_URL_DEV
      : process.env.OAUTH_CALLBACK_URL_PROD,
});

const handleGetGoogleOauthSuccess = (req: Request, res: Response) =>
  res.redirect(
    process.env.NODE_ENV
      ? (process.env.OAUTH_CALLBACK_URL_DEV as string)
      : (process.env.OAUTH_CALLBACK_URL_PROD as string)
  );

export {
  handlePostSignUp,
  handlePostSignIn,
  handleGetSignOut,
  handleGetGoogleOauth,
  handleGetGoogleOauthFailure,
  handleGetGoogleOauthSuccess,
};
