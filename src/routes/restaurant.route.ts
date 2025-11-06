import Router from 'express';
import { RestaurantRepository } from '../apis/restaurant/restaurant.repository';
import { RestaurantService } from '../apis/restaurant/restaurant.service';
import { RestaurantController } from '../apis/restaurant/restaurant.controller';
import { prisma } from '../config/db.config';
import { ReviewRepository } from '../apis/review/review.repository';
import ReviewService from '../apis/review/review.service';
import UserRepository from '../apis/user/user.repository';
import UserService from '../apis/user/user.service';

const restaurantRouter = Router();

const restaurantRepository = new RestaurantRepository(prisma);
const reviewRepository = new ReviewRepository(prisma);

const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);

const restaurantService = new RestaurantService(restaurantRepository);
const reviewService = new ReviewService(
  reviewRepository,
  restaurantService,
  userService
);

const restaurantController = new RestaurantController(
  restaurantService,
  reviewService
);

restaurantRouter.get('/', restaurantController.fetchRestaurants);
restaurantRouter.post('/', restaurantController.createRestaurant);
restaurantRouter.get(
  '/:restaurant_id/review',
  restaurantController.fetchListRestaurantReviews
);

export default restaurantRouter;
