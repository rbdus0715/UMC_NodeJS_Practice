import CreateUserMissionDto from './dto/userMission.dto';
import UserMissionRepository from './userMission.repository';

export default class UserMissionService {
  constructor(private readonly userMissionRepository: UserMissionRepository) {}

  async create(data: CreateUserMissionDto) {
    await this.userMissionRepository.create(data);
  }

  async find() {
    return await this.userMissionRepository.find();
  }
}
