import { user_mission } from '@prisma/client';
import CreateUserMissionDto from './dto/userMission.dto';
import UserMissionRepository from './userMission.repository';

export default class UserMissionService {
  constructor(private readonly userMissionRepository: UserMissionRepository) {}

  async create(data: CreateUserMissionDto): Promise<void> {
    await this.userMissionRepository.create(data);
  }

  async find(): Promise<user_mission[]> {
    return await this.userMissionRepository.find();
  }

  async update(user_id: string, mission_id: string, status: number): Promise<user_mission> {
    return await this.userMissionRepository.update(user_id, mission_id, status);
  }
}
