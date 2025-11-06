import { UserController } from '../apis/user/user.controller';
import UserRepository from '../apis/user/user.repository';
import UserService from '../apis/user/user.service';
import express from 'express';
import { prisma } from '../config/db.config';
import ReviewService from '../apis/review/review.service';
import { ReviewRepository } from '../apis/review/review.repository';
import { RestaurantService } from '../apis/restaurant/restaurant.service';
import { RestaurantRepository } from '../apis/restaurant/restaurant.repository';

const userRouter = express.Router();
const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);

const restaurantRepository = new RestaurantRepository(prisma);
const restaurantService = new RestaurantService(restaurantRepository);

const reviewRepository = new ReviewRepository(prisma);
const reviewService = new ReviewService(
  reviewRepository,
  restaurantService,
  userService
);

const userController = new UserController(userService, reviewService);

userRouter.get('/', userController.fetchUsers);
userRouter.get('/:user_id/review', userController.fetchUserReviews);

export default userRouter;
