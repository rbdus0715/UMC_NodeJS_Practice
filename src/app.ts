import express, { NextFunction, Request, Response } from 'express';
import setupMiddleware from './middlewares/setup.middleware';
import restaurantRouter from './routes/restaurant.route';
import reviewRouter from './routes/review.route';
import missionRouter from './routes/mission.route';
import userRouter from './routes/user.route';
import userMissionRouter from './routes/userMission.route';
import { errorHandler } from './middlewares/errorHandle.middleware';
import swaggerMiddleware from './middlewares/swagger.middleware';
import swaggerAutogen from 'swagger-autogen';

const app = express();

setupMiddleware(app);
swaggerMiddleware(app);

app.get(
  '/openapi.json',
  async (req: Request, res: Response, next: NextFunction) => {
    const options = {
      openapi: '3.0.0',
      disableLogs: true,
      writeOutputFile: false,
    };
    const outputFile = '/dev/null';
    const routes = ['../index.ts'];
    const doc = {
      info: {
        title: 'UMC 9th',
        description: 'UMC 9th Node.js 프로젝트입니다.',
      },
      host: 'localhost:3000',
    };
    const result = await swaggerAutogen(options)(outputFile, routes, doc);
    res.json(result ? result.data : null);
  }
);

app.use('/v1/restaurant', restaurantRouter);
app.use('/v1/review', reviewRouter);
app.use('/v1/mission', missionRouter);
app.use('/v1/user', userRouter);
app.use('/v1/user_mission', userMissionRouter);

app.use(errorHandler);

export default app;
