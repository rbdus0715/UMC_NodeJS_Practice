import express from 'express';
import setupMiddleware from './middlewares/setup.middleware';
import restaurantRouter from './routes/restaurant.route';
import reviewRouter from './routes/review.route';
import missionRouter from './routes/mission.route';
import userRouter from './routes/user.route';
import userMissionRouter from './routes/userMission.route';
import errorHandler from './middlewares/errorHandle.middleware';

const app = express();
setupMiddleware(app);
app.use(errorHandler);

app.use('/v1/restaurant', restaurantRouter);
app.use('/v1/review', reviewRouter);
app.use('/v1/mission', missionRouter);
app.use('/v1/user', userRouter);
app.use('/v1/user_mission', userMissionRouter);

export default app;
