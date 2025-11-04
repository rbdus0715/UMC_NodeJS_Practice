import express from 'express';
import UserMissionRepository from '../apis/user_mission/userMission.repository';
import pool from '../config/db.config';
import UserMissionService from '../apis/user_mission/userMission.service';
import UserMissionController from '../apis/user_mission/userMission.controller';

const userMissionRouter = express.Router();
const userMissionRepository = new UserMissionRepository(pool);
const userMissionService = new UserMissionService(userMissionRepository);
const userMissionController = new UserMissionController(userMissionService);

userMissionRouter.get('/', userMissionController.fetchUserMissions);
userMissionRouter.post('/', userMissionController.createUserMission);

export default userMissionRouter;
