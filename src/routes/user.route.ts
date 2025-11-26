import { UserController } from '../apis/user/user.controller';
import UserRepository from '../apis/user/user.repository';
import UserService from '../apis/user/user.service';
import express from 'express';
import prisma from '../config/db.config';
import ReviewService from '../apis/review/review.service';
import { ReviewRepository } from '../apis/review/review.repository';
import { RestaurantService } from '../apis/restaurant/restaurant.service';
import { RestaurantRepository } from '../apis/restaurant/restaurant.repository';
import MissionRepository from '../apis/mission/mission.repository';
import MissionService from '../apis/mission/mission.service';
import passport from 'passport';

const userRouter = express.Router();
const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);

const restaurantRepository = new RestaurantRepository(prisma);
const restaurantService = new RestaurantService(restaurantRepository);

const missionRepository = new MissionRepository(prisma);
const missionService = new MissionService(missionRepository);

const reviewRepository = new ReviewRepository(prisma);
const reviewService = new ReviewService(
  reviewRepository,
  restaurantService,
  userService
);

const userController = new UserController(
  userService,
  reviewService,
  missionService
);

const isLogin = passport.authenticate('jwt', { session: false });

userRouter.get(
  '/me',
  isLogin,
  // #swagger.tags = ['User']
  // #swagger.summary = '내 정보 조회'
  // #swagger.description = '현재 로그인한 사용자의 정보를 조회합니다.'
  /* #swagger.security = [{
    "bearerAuth": []
  }] */
  /* #swagger.responses[200] = {
    description: '내 정보 조회 성공',
    schema: {
      success: true,
      message: '내 정보 조회에 성공하였습니다.',
      data: { id: 'string', name: 'string', email: 'string', nickname: 'string' }
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
    description: '내 정보 조회 실패',
    schema: {
      success: false,
      message: '내 정보 조회에 실패하였습니다.'
    }
  } */
  userController.fetchUser
);

userRouter.put(
  '/me',
  isLogin,
  // #swagger.tags = ['User']
  // #swagger.summary = '내 정보 수정'
  // #swagger.description = '현재 로그인한 사용자의 정보를 수정합니다.'
  /* #swagger.security = [{
    "bearerAuth": []
  }] */
  /* #swagger.parameters['body'] = {
    in: 'body',
    required: false,
    schema: {
      name: 'string',
      gender: 'MALE|FEMALE|NONE',
      birth: '2024-01-01',
      nickname: 'string',
      password: 'string',
      profile_url: 'string',
      location: 'string',
      notice_status: 0
    }
  } */
  /* #swagger.responses[200] = {
    description: '내 정보 수정 성공',
    schema: {
      success: true,
      message: '내 정보 수정에 성공하였습니다.',
      data: { id: 'string', name: 'string', email: 'string', nickname: 'string' }
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
    description: '내 정보 수정 실패',
    schema: {
      success: false,
      message: '내 정보 수정에 실패하였습니다.'
    }
  } */
  userController.updateUser
);

userRouter.get(
  '/',
  // #swagger.tags = ['User']
  // #swagger.summary = '사용자 목록 조회'
  // #swagger.description = '모든 사용자 목록을 조회합니다.'
  /* #swagger.responses[200] = {
    description: '사용자 목록 조회 성공',
    schema: {
      success: true,
      message: '모든 유저의 정보 조회에 성공하였습니다.',
      data: [{ id: 'string', name: 'string', email: 'string' }]
    }
  } */
  /* #swagger.responses[500] = {
    description: '사용자 목록 조회 실패',
    schema: {
      success: false,
      message: '모든 유저의 정보 조회에 실패하였습니다.'
    }
  } */
  userController.fetchUsers
);

userRouter.get(
  '/:user_id/review',
  // #swagger.tags = ['User']
  // #swagger.summary = '사용자 리뷰 목록 조회'
  // #swagger.description = '특정 사용자의 리뷰 목록을 페이징하여 조회합니다.'
  /* #swagger.parameters['user_id'] = {
    in: 'path',
    required: true,
    type: 'string',
    description: '사용자 ID'
  } */
  /* #swagger.parameters['cursor'] = {
    in: 'query',
    required: false,
    type: 'string',
    description: '페이징 커서 (마지막 리뷰 ID)'
  } */
  /* #swagger.responses[200] = {
    description: '사용자 리뷰 조회 성공',
    schema: {
      success: true,
      message: '해당 유저에 대한 리뷰 조회 성공',
      data: [{ id: 'string', content: 'string', restaurant: { id: 'string', name: 'string' }, score: 0, created_at: 'string', review_img: 'string', comment: 'string' }]
    }
  } */
  /* #swagger.responses[500] = {
    description: '사용자 리뷰 조회 실패',
    schema: {
      success: false,
      message: '해당 유저에 대한 리뷰 조회 실패'
    }
  } */
  userController.fetchUserReviews
);

userRouter.get(
  '/:user_id/mission',
  // #swagger.tags = ['User']
  // #swagger.summary = '사용자 미션 목록 조회'
  // #swagger.description = '특정 사용자의 미션 목록을 페이징하여 조회합니다.'
  /* #swagger.parameters['user_id'] = {
    in: 'path',
    required: true,
    type: 'string',
    description: '사용자 ID'
  } */
  /* #swagger.parameters['cursor'] = {
    in: 'query',
    required: false,
    type: 'string',
    description: '페이징 커서 (마지막 미션 ID)'
  } */
  /* #swagger.responses[200] = {
    description: '사용자 미션 조회 성공',
    schema: {
      success: true,
      message: '해당 유저에 대한 미션 조회 성공',
      data: []
    }
  } */
  /* #swagger.responses[500] = {
    description: '사용자 미션 조회 실패',
    schema: {
      success: false,
      message: '해당 유저에 대한 미션 조회 실패'
    }
  } */
  userController.fetchUserMissions
);

export default userRouter;
