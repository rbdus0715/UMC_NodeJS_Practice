import Router from 'express';
import { RestaurantRepository } from '../apis/restaurant/restaurant.repository';
import pool from '../config/db.config';
import { RestaurantService } from '../apis/restaurant/restaurant.service';
import { RestaurantController } from '../apis/restaurant/restaurant.controller';
import asyncHandler from '../commons/asyncHandler';

const restaurantRouter = Router();
const restaurantRepository = new RestaurantRepository(pool);
const restaurantService = new RestaurantService(restaurantRepository);
const restaurantController = new RestaurantController(restaurantService);

restaurantRouter.get('/', asyncHandler(restaurantController.fetchRestaurants));
restaurantRouter.post('/', asyncHandler(restaurantController.createRestaurant));

export default restaurantRouter;
