import { RestaurantService } from '../restaurant/restaurant.service';
import { CreateReviewInput } from './dto/review.dto';
import { Review } from './entities/review.entity';
import { ReviewRepository } from './review.repository';

export default class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository,
    private readonly restaurantService: RestaurantService,
  ) {}

  async create(data: CreateReviewInput): Promise<Review> {
    // data.restaurant_id로 있는 식당인지 확인
    const restaurant = await this.restaurantService.findOneById({ id: data.restaurant_id });
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }
    return await this.reviewRepository.create(data);
  }
  async find(): Promise<Review[]> {
    return await this.reviewRepository.find();
  }
}
