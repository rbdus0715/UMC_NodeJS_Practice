import { ulid } from 'ulid';
import { CreateRestaurantInput } from './dto/restaurant.dto';
import { PrismaClient, restaurant } from '@prisma/client';

export class RestaurantRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: CreateRestaurantInput): Promise<restaurant> {
    // data.area_id = '01HZXYZ123ABCDEF4567890123';
    try {
      data.id = ulid();
      return await this.prisma.restaurant.create({ data });
    } catch (error) {
      // console.log(error);
      throw new Error('매장 생성 실패');
    }
  }

  async find(): Promise<restaurant[]> {
    return await this.prisma.restaurant.findMany();
  }

  async findOneById(id: string): Promise<restaurant> {
    const result = await this.prisma.restaurant.findFirst({ where: { id } });
    if (!result) throw new Error(`id: ${id}인 매장이 존재하지 않습니다.`);
    return result;
  }
}
