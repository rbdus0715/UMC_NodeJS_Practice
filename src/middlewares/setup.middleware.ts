import express from 'express';
import cors from 'cors';
import path from 'path';

const setupMiddleware = (app: express.Application) => {
  app.use(cors());
  app.use(express.static('public'));
  app.use('/public', express.static(path.join(__dirname, 'public')));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
};

export default setupMiddleware;
