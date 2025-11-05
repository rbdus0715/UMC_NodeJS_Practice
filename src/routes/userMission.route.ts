import express from 'express';
import UserMissionRepository from '../apis/user_mission/userMission.repository';
import UserMissionService from '../apis/user_mission/userMission.service';
import UserMissionController from '../apis/user_mission/userMission.controller';
import { prisma } from '../config/db.config';

const userMissionRouter = express.Router();
const userMissionRepository = new UserMissionRepository(prisma);
const userMissionService = new UserMissionService(userMissionRepository);
const userMissionController = new UserMissionController(userMissionService);

userMissionRouter.get('/', userMissionController.fetchUserMissions);
userMissionRouter.post('/', userMissionController.createUserMission);

export default userMissionRouter;
