import { CreateRestaurantInput } from './dto/restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { IRestaurantServiceFindOneById } from './interfaces/restaurant.interface';
import { RestaurantRepository } from './restaurant.repository';

export class RestaurantService {
  constructor(private readonly restaurantRepository: RestaurantRepository) {}

  async create(data: CreateRestaurantInput): Promise<Restaurant> {
    return this.restaurantRepository.create(data);
  }

  async findOneById({
    id,
  }: IRestaurantServiceFindOneById): Promise<Restaurant> {
    const result = await this.restaurantRepository.findOneById({ id });
    if (!result) {
      throw new Error(`id: ${id} 매장이 없습니다.`);
    }
    return result;
  }

  async find(): Promise<Restaurant[]> {
    return this.restaurantRepository.find();
  }
}
