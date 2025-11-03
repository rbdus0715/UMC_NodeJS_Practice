import UserMission from './entities/user-mission.entity';
import UserMissionRepository from './user-mission.repository';
import {
  CreateUserMissionInput,
  UpdateUserMissionStatusInput,
} from './dto/user-mission.dto';

export default class UserMissionService {
  constructor(private readonly userMissionRepository: UserMissionRepository) {}

  async joinMission(data: CreateUserMissionInput): Promise<UserMission> {
    // 이미 참여한 미션인지 확인
    const existing = await this.userMissionRepository.findByUserAndMission({
      user_id: data.user_id,
      mission_id: data.mission_id,
    });

    if (existing) {
      throw new Error('이미 참여한 미션입니다.');
    }

    return await this.userMissionRepository.create(data);
  }

  async findUserMissions({
    user_id,
  }: {
    user_id: string;
  }): Promise<UserMission[]> {
    return await this.userMissionRepository.findByUserId({ user_id });
  }

  async findMissionUsers({
    mission_id,
  }: {
    mission_id: string;
  }): Promise<UserMission[]> {
    return await this.userMissionRepository.findByMissionId({ mission_id });
  }

  async findByUserAndMission({
    user_id,
    mission_id,
  }: {
    user_id: string;
    mission_id: string;
  }): Promise<UserMission | null> {
    return await this.userMissionRepository.findByUserAndMission({
      user_id,
      mission_id,
    });
  }

  async updateStatus({
    user_id,
    mission_id,
    data,
  }: {
    user_id: string;
    mission_id: string;
    data: UpdateUserMissionStatusInput;
  }): Promise<UserMission> {
    return await this.userMissionRepository.updateStatus({
      user_id,
      mission_id,
      data,
    });
  }

  async completeMission({
    user_id,
    mission_id,
  }: {
    user_id: string;
    mission_id: string;
  }): Promise<UserMission> {
    return await this.userMissionRepository.updateStatus({
      user_id,
      mission_id,
      data: new UpdateUserMissionStatusInput(true),
    });
  }

  async getUserMissionsWithDetails({
    user_id,
  }: {
    user_id: string;
  }): Promise<any[]> {
    return await this.userMissionRepository.findUserMissionsWithDetails({
      user_id,
    });
  }

  async getMissionUsersWithDetails({
    mission_id,
  }: {
    mission_id: string;
  }): Promise<any[]> {
    return await this.userMissionRepository.findMissionUsersWithDetails({
      mission_id,
    });
  }

  async delete({
    user_id,
    mission_id,
  }: {
    user_id: string;
    mission_id: string;
  }): Promise<void> {
    return await this.userMissionRepository.delete({ user_id, mission_id });
  }

  async getAllUserMissions(): Promise<UserMission[]> {
    return await this.userMissionRepository.findAll();
  }

  async getAllUserMissionsWithDetails(): Promise<any[]> {
    return await this.userMissionRepository.findAllWithDetails();
  }
}
