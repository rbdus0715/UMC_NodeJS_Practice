import { Router } from 'express';
import { ReviewRepository } from '../apis/review/review.repository';
import ReviewService from '../apis/review/review.service';
import ReviewController from '../apis/review/review.controller';
import { RestaurantService } from '../apis/restaurant/restaurant.service';
import { RestaurantRepository } from '../apis/restaurant/restaurant.repository';
import prisma from '../config/db.config';
import UserRepository from '../apis/user/user.repository';
import UserService from '../apis/user/user.service';

const reviewRouter = Router();
const reviewRepository = new ReviewRepository(prisma);

const restaurantRepository = new RestaurantRepository(prisma);
const restaurantService = new RestaurantService(restaurantRepository);

const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);

const reviewService = new ReviewService(
  reviewRepository,
  restaurantService,
  userService
);
const reiviewController = new ReviewController(reviewService);



reviewRouter.post(
  '/',
  // #swagger.tags = ['Review']
  // #swagger.summary = '리뷰 생성'
  // #swagger.description = '새로운 리뷰를 생성합니다.'
  /* #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: {
      user_id: 'string',
      restaurant_id: 'string',
      score: 0,
      content: 'string'
    }
  } */
  /* #swagger.responses[201] = {
    description: '리뷰 생성 성공',
    schema: {
      success: true,
      message: '리뷰가 생성되었습니다.',
      data: { id: 'string', user_id: 'string', restaurant_id: 'string', score: 0, content: 'string' }
    }
  } */
  /* #swagger.responses[500] = {
    description: '리뷰 생성 실패',
    schema: {
      success: true,
      message: '리뷰 생성에 실패하였습니다.'
    }
  } */
  reiviewController.createReview
);

reviewRouter.get(
  '/',
  // #swagger.tags = ['Review']
  // #swagger.summary = '리뷰 목록 조회'
  // #swagger.description = '모든 리뷰 목록을 조회합니다.'
  /* #swagger.responses[200] = {
    description: '리뷰 목록 조회 성공',
    schema: {
      success: true,
      message: '모든 조회되었습니다.',
      data: [{ id: 'string', user_id: 'string', restaurant_id: 'string', score: 0, content: 'string' }]
    }
  } */
  /* #swagger.responses[500] = {
    description: '리뷰 목록 조회 실패',
    schema: {
      success: false,
      message: '모든 리뷰 조회에 실패하였습니다.'
    }
  } */
  reiviewController.fetchReviews
);
export default reviewRouter;
