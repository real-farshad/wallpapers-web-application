import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import {
  deserializeUser,
  serializeUser,
  authenticateWithGoogleStrategy,
  signInWithLocalStrategy,
} from '@src/api/services/authService';

const localStrategyOptions = { usernameField: 'email', passwordField: 'password' };
passport.use(new LocalStrategy(localStrategyOptions, signInWithLocalStrategy));

const googleStrategyOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  callbackURL: '/api/auth/google/callback',
};
passport.use(new GoogleStrategy(googleStrategyOptions, authenticateWithGoogleStrategy));

passport.serializeUser(serializeUser);

passport.deserializeUser(deserializeUser);

export default passport;
