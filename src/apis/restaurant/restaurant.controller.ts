import { ApiResponse } from '../../commons/apiResponse';
import { RestaurantService } from './restaurant.service';
import { Request, Response } from 'express';
import { CreateRestaurantInput } from './dto/restaurant.dto';
import ReviewService from '../review/review.service';

export class RestaurantController {
  constructor(
    private readonly restaurantService: RestaurantService, //
    private readonly reviewService: ReviewService
  ) {}
  createRestaurant = async (req: Request, res: Response) => {
    try {
      const createRestaurantDto = new CreateRestaurantInput(req.body);
      const newRestaurant = await this.restaurantService.create(
        createRestaurantDto
      );
      const response = ApiResponse.success(
        '레스토랑이 생성되었습니다.',
        newRestaurant
      );
      res.status(201).json(response);
    } catch (err) {
      const response = ApiResponse.error('레스토랑 생성에 실패하였습니다.');
      res.status(500).json(response);
    }
  };

  fetchRestaurants = async (req: Request, res: Response) => {
    const restaurants = await this.restaurantService.find();
    const response = ApiResponse.success('조회되었습니다.', restaurants);
    res.status(200).json(response);
  };

  fetchListRestaurantReviews = async (req: Request, res: Response) => {
    try {
      const reviews = await this.reviewService.findByRestaurantId(
        req.params.restaurant_id,
        String(req.query.cursor || '')
      );
      const response = ApiResponse.success('매장 리뷰 조회 성공', reviews);
      res.status(200).json(response);
    } catch (err) {
      const response = ApiResponse.error('매장 리뷰 조회 실패');
      res.status(500).json(response);
    }
  };
}
