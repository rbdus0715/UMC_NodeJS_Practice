import express, { NextFunction } from 'express';
import swaggerAutogen from 'swagger-autogen';
import swaggerUiExpress from 'swagger-ui-express';

const swaggerMiddleware = (app: express.Application) => {
  app.use(
    '/docs',
    swaggerUiExpress.serve,
    swaggerUiExpress.setup(
      {},
      {
        swaggerOptions: {
          url: '/openapi.json',
        },
      }
    )
  );
};

export default swaggerMiddleware;
