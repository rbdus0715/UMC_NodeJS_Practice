import dotenv from 'dotenv';
import passport from 'passport';
import { googleStrategy, naverStrategy, jwtStrategy } from '../config/auth';
import express from 'express';

const passportGoogle = (app: express.Application) => {
  dotenv.config();
  passport.use(googleStrategy);
  passport.use(naverStrategy);
  passport.use(jwtStrategy);
  app.use(passport.initialize());
};

export default passportGoogle;
