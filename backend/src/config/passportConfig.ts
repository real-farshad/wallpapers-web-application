import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import signInWithLocalStrategy from '@src/services/auth/signInWithLocalStrategy';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import authenticateWithGoogleStrategy from '@src/services/auth/authenticateWithGoogleStrategy';
import serializeUser from '@src/services/auth/serializeUser';
import deserializeUser from '@src/services/auth/deserializeUser';

const localStrategyOptions = { usernameField: 'email', passwordField: 'password' };
passport.use(new LocalStrategy(localStrategyOptions, signInWithLocalStrategy));

const googleStrategyOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  callbackURL: '/api/auth/google/callback',
  scope: ['profile', 'email'],
};
passport.use(new GoogleStrategy(googleStrategyOptions, authenticateWithGoogleStrategy));

passport.serializeUser(serializeUser);

passport.deserializeUser(deserializeUser);

export default passport;
