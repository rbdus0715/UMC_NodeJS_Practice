import express, { NextFunction, Request, Response } from 'express';
import setupMiddleware from './middlewares/setup.middleware';
import restaurantRouter from './routes/restaurant.route';
import reviewRouter from './routes/review.route';
import missionRouter from './routes/mission.route';
import userRouter from './routes/user.route';
import userMissionRouter from './routes/userMission.route';
import fileRouter from './routes/file.route';
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
      disableLogs: false,
      writeOutputFile: false,
      type: 'typescript',
    };
    const outputFile = '/dev/null';
    // 모든 라우트 파일을 포함해야 함
    const routes = [
      './src/routes/restaurant.route.ts',
      './src/routes/review.route.ts',
      './src/routes/mission.route.ts',
      './src/routes/user.route.ts',
      './src/routes/userMission.route.ts',
      './src/routes/file.route.ts',
    ];
    const doc = {
      info: {
        title: 'UMC 9th',
        version: '1.0.0', // 버전 추가
        description: 'UMC 9th Node.js 프로젝트입니다.',
      },
      host: 'localhost:3000',
      basePath: '/',
      schemes: ['http'],
      tags: [
        { name: 'Restaurant', description: '음식점 관련 API' },
        // { name: 'Review', description: '리뷰 관련 API' },
        // { name: 'Mission', description: '미션 관련 API' },
        { name: 'User', description: '사용자 관련 API' },
        { name: 'UserMission', description: '사용자 미션 관련 API' },
        { name: 'File', description: '파일 업로드 관련 API' },
      ],
    };

    try {
      const result = await swaggerAutogen(options)(outputFile, routes, doc);
      res.json(result ? result.data : null);
    } catch (error) {
      next(error);
    }
  }
);

app.use('/v1/restaurant', restaurantRouter);
app.use('/v1/review', reviewRouter);
app.use('/v1/mission', missionRouter);
app.use('/v1/user', userRouter);
app.use('/v1/user_mission', userMissionRouter);
app.use('/v1/file', fileRouter);

app.use(errorHandler);

export default app;
