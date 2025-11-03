import express from 'express';
import setupMiddleware from './middlewares/setup.middleware';
import { errorHandler } from './middlewares/error-handler.middleware';
import { ApiResponse } from './commons/api-response';
import restaurantRouter from './routes/restaurant.route';
import reviewRouter from './routes/review.route';
import missionRouter from './routes/mission.route';
import userMissionRouter from './routes/user-mission.route';

const app = express();
setupMiddleware(app);

app.use('/api/v1/restaurant', restaurantRouter);
app.use('/api/v1/review', reviewRouter);
app.use('/api/v1/mission', missionRouter);
app.use('/api/v1/user-mission', userMissionRouter);

app.use((req, res, next) => {
  const errorResponse = ApiResponse.error(
    '요청한 리소스를 찾을 수 없습니다.',
    404
  );
  res.status(404).json(errorResponse);
});

app.use(errorHandler);

export default app;
