import { RestaurantService } from '../restaurant/restaurant.service';
import { CreateReviewDto } from './dto/review.dto';
import { Review } from './entities/review.entity';
import { ReviewRepository } from './review.repository';

export default class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly restaurantService: RestaurantService
  ) {}

  async create(data: CreateReviewDto): Promise<Review> {
    await this.restaurantService.findOneById({ id: data.restaurant_id });
    // restaurantService 안에서 에러처리 진행되므로 여기서는 생략함
    // if (!restaurant) {
    //   throw new Error(`id: ${data.restaurant_id} 인 매장이 없습니다.`);
    // }
    return await this.reviewRepository.create(data);
  }
  async find(): Promise<Review[]> {
    return await this.reviewRepository.find();
  }
}
