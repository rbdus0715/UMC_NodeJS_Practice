import Router from 'express';
import { RestaurantRepository } from '../apis/restaurant/restaurant.repository';
import pool from '../config/db.config';
import { RestaurantService } from '../apis/restaurant/restaurant.service';
import { RestaurantController } from '../apis/restaurant/restaurant.controller';

const restaurantRouter = Router();
const restaurantRepository = new RestaurantRepository(pool);
const restaurantService = new RestaurantService(restaurantRepository);
const restaurantController = new RestaurantController(restaurantService);

restaurantRouter.get('/', restaurantController.fetchRestaurants);
restaurantRouter.post('/', restaurantController.createRestaurant);

export default restaurantRouter;
