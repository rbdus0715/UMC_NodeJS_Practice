import { Router } from 'express';
import UserMissionRepository from '../apis/user_mission/user-mission.repository';
import pool from '../config/db.config';
import UserMissionService from '../apis/user_mission/user-mission.service';
import UserMissionController from '../apis/user_mission/user-mission.controller';
import asyncHandler from '../commons/asyncHandler';

const userMissionRouter = Router();
const userMissionRepository = new UserMissionRepository(pool);
const userMissionService = new UserMissionService(userMissionRepository);
const userMissionController = new UserMissionController(userMissionService);

userMissionRouter.post('/', asyncHandler(userMissionController.joinMission));
userMissionRouter.get(
  '/user/:user_id',
  asyncHandler(userMissionController.getUserMissions)
);
userMissionRouter.get(
  '/mission/:mission_id',
  asyncHandler(userMissionController.getMissionUsers)
);
userMissionRouter.patch(
  '/user/:user_id/mission/:mission_id/status',
  asyncHandler(userMissionController.updateStatus)
);
userMissionRouter.patch(
  '/user/:user_id/mission/:mission_id/complete',
  asyncHandler(userMissionController.completeMission)
);
userMissionRouter.delete(
  '/user/:user_id/mission/:mission_id',
  asyncHandler(userMissionController.delete)
);
userMissionRouter.get(
  '/',
  asyncHandler(userMissionController.getAllUserMissions)
);

export default userMissionRouter;
