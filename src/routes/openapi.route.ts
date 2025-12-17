import { NextFunction, Request, Response, Router } from 'express';
import swaggerAutogen from 'swagger-autogen';

const openapiRouter = Router();

openapiRouter.get(
  '/',
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

export default openapiRouter;
