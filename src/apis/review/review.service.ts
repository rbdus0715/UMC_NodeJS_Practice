import { review } from '@prisma/client';
import { RestaurantService } from '../restaurant/restaurant.service';
import { CreateReviewDto } from './dto/review.dto';
import { ReviewRepository } from './review.repository';

export default class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly restaurantService: RestaurantService
  ) {}

  async create(data: CreateReviewDto): Promise<review> {
    await this.restaurantService.findOneById({ id: data.restaurant_id });
    return await this.reviewRepository.create(data);
  }
  async find(): Promise<review[]> {
    return await this.reviewRepository.find();
  }
}
