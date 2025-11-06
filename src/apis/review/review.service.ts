import { review } from '@prisma/client';
import { RestaurantService } from '../restaurant/restaurant.service';
import { CreateReviewDto } from './dto/review.dto';
import { ReviewRepository } from './review.repository';
import UserService from '../user/user.service';

export default class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly restaurantService: RestaurantService,
    private readonly userService: UserService
  ) {}

  async create(data: CreateReviewDto): Promise<review> {
    await this.restaurantService.findOneById(data.restaurant_id); // 없으면 에러 throw
    return await this.reviewRepository.create(data);
  }

  async find(): Promise<review[]> {
    return await this.reviewRepository.find();
  }

  async findByRestaurantId(restaurant_id: string, cursor: string) {
    await this.restaurantService.findOneById(restaurant_id); // 없으면 에러 throw
    return this.reviewRepository.findByRestaurantId(restaurant_id, cursor);
  }

  async findByUserId(user_id: string, cursor: string) {
    await this.userService.findOneById({ id: user_id }); // 없으면 에러
    return this.reviewRepository.findByUserId(user_id, cursor);
  }
}
