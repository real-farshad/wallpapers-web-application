import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import serializeUser from '@src/services/auth/serializeUser';
import deserializeUser from '@src/services/auth/deserializeUser';

import {
  localStrategyOptions,
  signInWithLocalStrategy,
} from '@services/auth/signInWithLocalStrategy';

import {
  googleStrategyOptions,
  authenticateWithGoogleStrategy,
} from '@services/auth/authenticateWithGoogleStrategy';

passport.use(new LocalStrategy(localStrategyOptions, signInWithLocalStrategy));

passport.use(new GoogleStrategy(googleStrategyOptions, authenticateWithGoogleStrategy));

passport.serializeUser(serializeUser);

passport.deserializeUser(deserializeUser);

export default passport;
