import dotenv from 'dotenv';
import passport from 'passport';
import { naverStrategy, jwtStrategy } from '../config/auth';
import express from 'express';

const passportNaver = (app: express.Application) => {
  dotenv.config();
  passport.use(naverStrategy);
  passport.use(jwtStrategy);
  app.use(passport.initialize());
};

export default passportNaver;

