import { PrismaClient, review } from '@prisma/client';
import { CreateReviewDto, responseFromReviews } from './dto/review.dto';
import { ulid } from 'ulid';

export class ReviewRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: CreateReviewDto): Promise<review> {
    data.id = ulid();
    const result = this.prisma.review.create({ data });
    return result;
  }

  async find(): Promise<review[]> {
    return await this.prisma.review.findMany();
  }

  async findOneById({ id }: { id: string }): Promise<review> {
    const result = await this.prisma.review.findFirst({ where: { id } });
    if (!result) throw new Error('해당 아이디를 갖는 리뷰 없음');
    return result;
  }

  async findByRestaurantId(restaurant_id: string, cursor: string) {
    const reviews = await this.prisma.review.findMany({
      select: {
        id: true,
        content: true,
        restaurant: true,
        user: true,
      },
      where: { restaurant_id, id: { gt: cursor } },
      orderBy: { id: 'asc' },
      take: 5,
    });
    return responseFromReviews(reviews); // dto 적용하여 다음 커서 추가 후 반환
  }

  async findByUserId(user_id: string, cursor: string) {
    const reviews = await this.prisma.review.findMany({
      select: {
        id: true,
        content: true,
        restaurant: {
          select: {
            id: true,
            name: true,
          },
        },
        score: true,
        created_at: true,
        review_img: true,
        comment: true,
      },
      where: { user_id, id: { gt: cursor } },
      orderBy: { created_at: 'desc' },
      take: 5,
    });
    return reviews;
  }
}
