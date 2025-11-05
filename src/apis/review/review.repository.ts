import { PrismaClient, review } from '@prisma/client';
import { CreateReviewDto } from './dto/review.dto';
import { ulid } from 'ulid';

export class ReviewRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: CreateReviewDto): Promise<review> {
    try {
      data.id = ulid();
      const result = this.prisma.review.create({ data });
      return result;
    } catch (error) {
      throw new Error('리뷰 생성 실패');
    }
  }

  async find(): Promise<review[]> {
    return await this.prisma.review.findMany();
  }

  async findOneById({ id }: { id: string }): Promise<review> {
    const result = await this.prisma.review.findFirst({ where: { id } });
    if (!result) throw new Error('해당 아이디를 갖는 리뷰 없음');
    return result;
  }
}
