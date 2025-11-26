import express, { NextFunction, Request, Response } from 'express';
import setupMiddleware from './middlewares/setup.middleware';
import restaurantRouter from './routes/restaurant.route';
import reviewRouter from './routes/review.route';
import missionRouter from './routes/mission.route';
import userRouter from './routes/user.route';
import userMissionRouter from './routes/userMission.route';
import fileRouter from './routes/file.route';
import oauthRouter from './routes/oauth.route';
import { errorHandler } from './middlewares/errorHandle.middleware';
import swaggerMiddleware from './middlewares/swagger.middleware';
import openapiRouter from './routes/openapi.route';
import passportGoogle from './middlewares/passportGoogle.middleware';

const app = express();

setupMiddleware(app);
passportGoogle(app);
swaggerMiddleware(app);

app.use('openapi.json', openapiRouter);
app.use('/oauth2', oauthRouter);
app.use('/v1/restaurant', restaurantRouter);
app.use('/v1/review', reviewRouter);
app.use('/v1/mission', missionRouter);
app.use('/v1/user', userRouter);
app.use('/v1/user_mission', userMissionRouter);
app.use('/v1/file', fileRouter);

app.use(errorHandler);

export default app;
