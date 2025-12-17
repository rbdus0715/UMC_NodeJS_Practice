import express from 'express';
import UserMissionRepository from '../apis/user_mission/userMission.repository';
import UserMissionService from '../apis/user_mission/userMission.service';
import UserMissionController from '../apis/user_mission/userMission.controller';
import prisma from '../config/db.config';
import passport from 'passport';

const userMissionRouter = express.Router();
const userMissionRepository = new UserMissionRepository(prisma);
const userMissionService = new UserMissionService(userMissionRepository);
const userMissionController = new UserMissionController(userMissionService);

const isLogin = passport.authenticate('jwt', { session: false });

userMissionRouter.get(
  '/',
  // #swagger.tags = ['UserMission']
  // #swagger.summary = '사용자 미션 목록 조회'
  // #swagger.description = '모든 사용자-미션 목록을 조회합니다.'
  /* #swagger.responses[201] = {
    description: '사용자 미션 목록 조회 성공',
    schema: {
      success: true,
      message: '유저-미션 조회 성공',
      data: []
    }
  } */
  /* #swagger.responses[500] = {
    description: '사용자 미션 목록 조회 실패',
    schema: {
      success: false,
      message: '유저-미션 조회 실패'
    }
  } */
  userMissionController.fetchUserMissions
);

userMissionRouter.post(
  '/',
  isLogin,
  // #swagger.tags = ['UserMission']
  // #swagger.summary = '사용자 미션 생성'
  // #swagger.description = '새로운 사용자-미션을 생성합니다.'
  /* #swagger.security = [{
    "bearerAuth": []
  }] */
  /* #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: {
      user_id: 'string',
      mission_id: 'string',
      restaurant_id: 'string',
      area_id: 'string'
    }
  } */
  /* #swagger.responses[201] = {
    description: '사용자 미션 생성 성공',
    schema: {
      success: true,
      message: '유저-미션 생성 성공'
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
    description: '사용자 미션 생성 실패',
    schema: {
      success: false,
      message: '유저-미션 생성 실패'
    }
  } */
  userMissionController.createUserMission
);

userMissionRouter.patch(
  '/:user_id/:mission_id',
  isLogin,
  // #swagger.tags = ['UserMission']
  // #swagger.summary = '사용자 미션 완료 처리'
  // #swagger.description = '사용자 미션을 완료 처리합니다.'
  /* #swagger.security = [{
    "bearerAuth": []
  }] */
  /* #swagger.parameters['user_id'] = {
    in: 'path',
    required: true,
    type: 'string',
    description: '사용자 ID'
  } */
  /* #swagger.parameters['mission_id'] = {
    in: 'path',
    required: true,
    type: 'string',
    description: '미션 ID'
  } */
  /* #swagger.parameters['body'] = {
    in: 'body',
    required: false,
    schema: {
      status: 1
    }
  } */
  /* #swagger.responses[200] = {
    description: '미션 완료 처리 성공',
    schema: {
      success: true,
      message: '미션 완료 처리 성공',
      data: {}
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
    description: '미션 완료 처리 실패',
    schema: {
      success: false,
      message: '미션 완료 처리 실패'
    }
  } */
  userMissionController.completeUserMission
);

export default userMissionRouter;
