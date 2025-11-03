import { IContext } from '../../commons/interfaces/context.interface';
import { ApiResponse } from '../../commons/api-response';
import { RestaurantService } from './restaurant.service';

export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  createRestaurant = async (context: IContext) => {
    const restaurantData = context.req.body;
    const newRestaurant = await this.restaurantService.create(restaurantData);
    const response = ApiResponse.success('레스토랑이 생성되었습니다.', newRestaurant, 200);
    context.res.status(200).json(response);
  };

  fetchRestaurants = async (context: IContext) => {
    const restaurants = await this.restaurantService.find();
    const response = ApiResponse.success('조회되었습니다.', restaurants, 200);
    context.res.status(200).json(response);
  };
}
