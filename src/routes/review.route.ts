import { Router } from 'express';
import { ReviewRepository } from '../apis/review/review.repository';
import ReviewService from '../apis/review/review.service';
import ReviewController from '../apis/review/review.controller';
import { RestaurantService } from '../apis/restaurant/restaurant.service';
import { RestaurantRepository } from '../apis/restaurant/restaurant.repository';
import { prisma } from '../config/db.config';

const reviewRouter = Router();
const reviewRepository = new ReviewRepository(prisma);

const restaurantRepository = new RestaurantRepository(prisma);
const restaurantService = new RestaurantService(restaurantRepository);
const reviewService = new ReviewService(reviewRepository, restaurantService);
const reiviewController = new ReviewController(reviewService);

reviewRouter.post('/', reiviewController.createReview);
reviewRouter.get('/', reiviewController.fetchReviews);
export default reviewRouter;
