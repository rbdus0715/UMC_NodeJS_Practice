import Router from 'express';
import { RestaurantRepository } from '../apis/restaurant/restaurant.repository';
import { RestaurantService } from '../apis/restaurant/restaurant.service';
import { RestaurantController } from '../apis/restaurant/restaurant.controller';
import prisma from '../config/db.config';
import { ReviewRepository } from '../apis/review/review.repository';
import ReviewService from '../apis/review/review.service';
import UserRepository from '../apis/user/user.repository';
import UserService from '../apis/user/user.service';
import MissionService from '../apis/mission/mission.service';
import MissionRepository from '../apis/mission/mission.repository';

const restaurantRouter = Router();

const restaurantRepository = new RestaurantRepository(prisma);
const reviewRepository = new ReviewRepository(prisma);

const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);

const missionRepository = new MissionRepository(prisma);
const missionService = new MissionService(missionRepository);

const restaurantService = new RestaurantService(restaurantRepository);
const reviewService = new ReviewService(
  reviewRepository,
  restaurantService,
  userService
);

const restaurantController = new RestaurantController(
  restaurantService,
  reviewService,
  missionService
);

restaurantRouter.get(
  '/',
  // #swagger.tags = ['Restaurant']
  // #swagger.summary = '레스토랑 목록 조회'
  // #swagger.description = '모든 레스토랑 목록을 조회합니다.'
  /* #swagger.responses[200] = {
    description: '레스토랑 목록 조회 성공',
    schema: {
      success: true,
      message: '조회되었습니다.',
      data: [{ id: 'string', name: 'string', phone_number: 'string', location: 'string', lat: 0, lng: 0 }]
    }
  } */
  restaurantController.fetchRestaurants
);

restaurantRouter.post(
  '/',
  // #swagger.tags = ['Restaurant']
  // #swagger.summary = '레스토랑 생성'
  // #swagger.description = '새로운 레스토랑을 생성합니다.'
  /* #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: {
      area_id: 'string',
      name: 'string',
      phone_number: 'string',
      location: 'string',
      lat: 0,
      lng: 0
    }
  } */
  /* #swagger.responses[201] = {
    description: '레스토랑 생성 성공',
    schema: {
      success: true,
      message: '레스토랑이 생성되었습니다.',
      data: { id: 'string', name: 'string', phone_number: 'string', location: 'string', lat: 0, lng: 0 }
    }
  } */
  /* #swagger.responses[500] = {
    description: '레스토랑 생성 실패',
    schema: {
      success: false,
      message: '레스토랑 생성에 실패하였습니다.'
    }
  } */
  restaurantController.createRestaurant
);

restaurantRouter.get(
  '/:restaurant_id/review',
  // #swagger.tags = ['Restaurant']
  // #swagger.summary = '레스토랑 리뷰 목록 조회'
  // #swagger.description = '특정 레스토랑의 리뷰 목록을 페이징하여 조회합니다.'
  /* #swagger.parameters['restaurant_id'] = {
    in: 'path',
    required: true,
    type: 'string',
    description: '레스토랑 ID'
  } */
  /* #swagger.parameters['cursor'] = {
    in: 'query',
    required: false,
    type: 'string',
    description: '페이징 커서 (마지막 리뷰 ID)'
  } */
  /* #swagger.responses[200] = {
    description: '레스토랑 리뷰 조회 성공',
    schema: {
      success: true,
      message: '매장 리뷰 조회 성공',
      data: [{ id: 'string', content: 'string', restaurant: {}, user: {} }]
    }
  } */
  /* #swagger.responses[500] = {
    description: '레스토랑 리뷰 조회 실패',
    schema: {
      success: false,
      message: '매장 리뷰 조회 실패'
    }
  } */
  restaurantController.fetchListRestaurantReviews
);

restaurantRouter.get(
  '/:restaurant_id/mission',
  // #swagger.tags = ['Restaurant']
  // #swagger.summary = '레스토랑 미션 목록 조회'
  // #swagger.description = '특정 레스토랑의 미션 목록을 페이징하여 조회합니다.'
  /* #swagger.parameters['restaurant_id'] = {
    in: 'path',
    required: true,
    type: 'string',
    description: '레스토랑 ID'
  } */
  /* #swagger.parameters['cursor'] = {
    in: 'query',
    required: false,
    type: 'string',
    description: '페이징 커서 (마지막 미션 ID)'
  } */
  /* #swagger.responses[200] = {
    description: '레스토랑 미션 조회 성공',
    schema: {
      success: true,
      message: '매장 미션 조회 성공',
      data: []
    }
  } */
  /* #swagger.responses[500] = {
    description: '레스토랑 미션 조회 실패',
    schema: {
      success: false,
      message: '매장 미션 조회 실패'
    }
  } */
  restaurantController.fetchListRestaurantMissions
);

export default restaurantRouter;
