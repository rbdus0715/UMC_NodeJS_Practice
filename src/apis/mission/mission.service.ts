import { CreateMissionInput } from './dto/mission.dto';
import { Mission } from './entities/mission.entity';
import MissionRepository from './mission.repository';

export default class MissionService {
  constructor(private readonly missionRepository: MissionRepository) {}

  async create(data: CreateMissionInput): Promise<Mission> {
    return await this.missionRepository.create(data);
  }

  async find(): Promise<Mission[]> {
    return await this.missionRepository.find();
  }
}
