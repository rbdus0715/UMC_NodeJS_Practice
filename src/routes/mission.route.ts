import { Router } from "express";
import asyncHandler from "../commons/asyncHandler";
import MissionController from "../apis/mission/mission.controller";
import MissionRepository from "../apis/mission/mission.repository";
import pool from "../config/db.config";
import MissionService from "../apis/mission/mission.service";

const missionRouter = Router();

const missionRepository = new MissionRepository(pool);
const missionService = new MissionService(missionRepository);
const missionController = new MissionController(missionService);

missionRouter.post('/', asyncHandler(missionController.createMission));
missionRouter.get('/', asyncHandler(missionController.fetchMissions));

export default missionRouter;