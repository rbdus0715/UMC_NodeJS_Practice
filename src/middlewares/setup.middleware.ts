import express from 'express';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import compression from 'compression';

const setupMiddleware = (app: express.Application) => {
  app.use(
    compression({
      threshold: 512,
    })
  );
  app.use(cors());
  app.use(express.static('public'));
  app.use('/public', express.static(path.join(__dirname, 'public')));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(morgan('dev'));
  app.use(cookieParser());
};

export default setupMiddleware;
