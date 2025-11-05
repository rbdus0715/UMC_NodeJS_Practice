import { mission } from '@prisma/client';
import { CreateMissionDto } from './dto/mission.dto';
import MissionRepository from './mission.repository';

export default class MissionService {
  constructor(private readonly missionRepository: MissionRepository) {}

  async create(data: CreateMissionDto): Promise<mission> {
    return await this.missionRepository.create(data);
  }

  async find(): Promise<mission[]> {
    return await this.missionRepository.find();
  }

  async findOneById(id: string) {
    const result = await this.missionRepository.findOneById({ id });
    if (!result) throw new Error(`id: ${id}인 미션이 존재하지 않습니다.`);
    return result;
  }
}
