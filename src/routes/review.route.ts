import { Router } from 'express';
import { ReviewRepository } from '../apis/review/review.repository';
import pool from '../config/db.config';
import ReviewService from '../apis/review/review.service';
import ReviewController from '../apis/review/review.controller';
import asyncHandler from '../commons/asyncHandler';
import { RestaurantService } from '../apis/restaurant/restaurant.service';
import { RestaurantRepository } from '../apis/restaurant/restaurant.repository';

const reviewRouter = Router();
const reviewRepository = new ReviewRepository(pool);

const restaurantRepository = new RestaurantRepository(pool);
const restaurantService = new RestaurantService(restaurantRepository);
const reviewService = new ReviewService(reviewRepository, restaurantService);
const reiviewController = new ReviewController(reviewService);

reviewRouter.post('/', asyncHandler(reiviewController.createReview));
reviewRouter.get('/', asyncHandler(reiviewController.fetchReviews));
export default reviewRouter;
