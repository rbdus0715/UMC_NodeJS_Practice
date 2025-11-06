import { CreateMissionDto } from './dto/mission.dto';
import { ulid } from 'ulid';
import { mission, PrismaClient } from '@prisma/client';

export default class MissionRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: CreateMissionDto): Promise<mission> {
    try {
      // data.restaurant_id = 01K90WTE6MGHK2PJBM5RKHT29Y;
      // data.area_id = 01HZXYZ123ABCDEF4567890123;
      data.id = ulid();
      return await this.prisma.mission.create({ data });
    } catch (error) {
      throw new Error('미션 생성 실패');
    }
  }

  async findOneById({ id }: { id: string }): Promise<mission> {
    const result = await this.prisma.mission.findFirst({ where: { id } });
    if (!result) throw new Error(`id: ${id}인 mission이 존재하지 않습니다.`);
    return result;
  }

  async find(): Promise<mission[]> {
    const result = await this.prisma.mission.findMany();
    return result;
  }

  async findByRestaurantId(restaurant_id: string, cursor: string) {
    const missions = await this.prisma.mission.findMany({
      select: {
        user_mission: {
          select: {
            mission: true,
          },
        },
      },
      where: { restaurant_id, id: { gt: cursor } },
      orderBy: { created_at: 'desc' },
      take: 5,
    });
    return missions;
  }

  async findByUserId(user_id: string, cursor: string) {
    const missions = await this.prisma.user_mission.findMany({
      where: { user_id },
      include: { mission: true },
    });
    return missions;
  }
}
