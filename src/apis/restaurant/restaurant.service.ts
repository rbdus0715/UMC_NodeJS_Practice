import { restaurant } from '@prisma/client';
import { CreateRestaurantInput } from './dto/restaurant.dto';
import { IRestaurantServiceFindOneById } from './interfaces/restaurant.interface';
import { RestaurantRepository } from './restaurant.repository';

export class RestaurantService {
  constructor(private readonly restaurantRepository: RestaurantRepository) {}

  async create(data: CreateRestaurantInput): Promise<restaurant> {
    return this.restaurantRepository.create(data);
  }

  async findOneById(id: string): Promise<restaurant> {
    const result = await this.restaurantRepository.findOneById(id);
    if (!result) {
      throw new Error(`id: ${id} 매장이 없습니다.`);
    }
    return result;
  }

  async find(): Promise<restaurant[]> {
    return this.restaurantRepository.find();
  }
}
