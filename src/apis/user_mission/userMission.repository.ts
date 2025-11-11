import { PrismaClient, user_mission } from '@prisma/client';
import CreateUserMissionDto from './dto/userMission.dto';

export default class UserMissionRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: CreateUserMissionDto): Promise<user_mission> {
    // "user_id": "01K924XQ0703MBTFQT2VR209CZ",
    // "mission_id": "01K922WV1E1NYQ3NHC9TBE6G4E",
    // "restaurant_id": "01K90X74VF849DQFX4F2XGD4F8",
    // "area_id": "01K924XQ0703MBTFQT2VR209CZ",
    // "status": 0
    return await this.prisma.user_mission.create({ data });
  }

  async find(): Promise<user_mission[]> {
    const result = await this.prisma.user_mission.findMany();
    if (!result || result?.length == 0) throw new Error('유저-미션 조회 실패');
    return result;
  }

  async update(
    user_id: string,
    mission_id: string,
    status: number
  ): Promise<user_mission> {
    return await this.prisma.user_mission.update({
      where: {
        user_id_mission_id: {
          user_id: user_id,
          mission_id: mission_id,
        },
      },
      data: {
        status,
      },
    });
  }
}
