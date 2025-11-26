import { Router } from 'express';
import asyncHandler from '../commons/asyncHandler';
import MissionRepository from '../apis/mission/mission.repository';
import MissionService from '../apis/mission/mission.service';
import MissionController from '../apis/mission/mission.controller';
import prisma from '../config/db.config';
import passport from 'passport';

const missionRouter = Router();

const missionRepository = new MissionRepository(prisma);
const missionService = new MissionService(missionRepository);
const missionController = new MissionController(missionService);

const isLogin = passport.authenticate('jwt', { session: false });


missionRouter.post(
  '/',
  isLogin,
  // #swagger.tags = ['Mission']
  // #swagger.summary = '미션 생성'
  // #swagger.description = '새로운 미션을 생성합니다.'
  /* #swagger.security = [{
    "bearerAuth": []
  }] */
  /* #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: {
      restaurant_id: 'string',
      area_id: 'string',
      content: 'string',
      price: 10000,
      point: 0,
      deadline: '2024-12-31T00:00:00.000Z'
    }
  } */
  /* #swagger.responses[201] = {
    description: '미션 생성 성공',
    schema: {
      success: true,
      message: '미션이 생성되었습니다.',
      data: { id: 'string', restaurant_id: 'string', area_id: 'string', content: 'string', price: 0, point: 0, deadline: 'string' }
    }
  } */
  /* #swagger.responses[401] = {
    description: '인증 실패',
    schema: {
      success: false,
      message: '인증된 사용자 정보를 찾을 수 없습니다.'
    }
  } */
  /* #swagger.responses[500] = {
    description: '미션 생성 실패',
    schema: {
      success: false,
      message: '미션 생성에 실패했습니다.'
    }
  } */
  missionController.createMission
);

missionRouter.get(
  '/',
  // #swagger.tags = ['Mission']
  // #swagger.summary = '미션 목록 조회'
  // #swagger.description = '모든 미션 목록을 조회합니다.'
  /* #swagger.responses[200] = {
    description: '미션 목록 조회 성공',
    schema: {
      success: true,
      message: '조회되었습니다.',
      data: [{ id: 'string', restaurant_id: 'string', area_id: 'string', content: 'string', price: 0, point: 0, deadline: 'string' }]
    }
  } */
  asyncHandler(missionController.fetchMissions)
);

export default missionRouter;