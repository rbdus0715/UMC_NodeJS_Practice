import { Router } from 'express';
import asyncHandler from '../commons/asyncHandler';
import MissionRepository from '../apis/mission/mission.repository';
import MissionService from '../apis/mission/mission.service';
import MissionController from '../apis/mission/mission.controller';
import { prisma } from '../config/db.config';

const missionRouter = Router();

const missionRepository = new MissionRepository(prisma);
const missionService = new MissionService(missionRepository);
const missionController = new MissionController(missionService);

missionRouter.post('/', missionController.createMission);
missionRouter.get('/', asyncHandler(missionController.fetchMissions));

export default missionRouter;
