import { Request, Response } from 'express';
import UserMissionService from './userMission.service';
import CreateUserMissionDto from './dto/userMission.dto';
import { UpdateUserMissionDto } from './dto/userMission.dto';
import { ApiResponse } from '../../commons/apiResponse';

export default class UserMissionController {
  constructor(private readonly userMissionService: UserMissionService) {}

  createUserMission = async (req: Request, res: Response) => {
    try {
      const createUserMissionDto = new CreateUserMissionDto(req.body);
      await this.userMissionService.create(createUserMissionDto);
      const response = ApiResponse.success('유저-미션 생성 성공');
      res.status(201).json(response);
    } catch (err) {
      const response = ApiResponse.error('유저-미션 생성 실패');
      res.status(500).json(response);
    }
  };

  fetchUserMissions = async (req: Request, res: Response) => {
    try {
      const result = await this.userMissionService.find();
      const response = ApiResponse.success('유저-미션 조회 성공', result);
      res.status(201).json(response);
    } catch (err) {
      const response = ApiResponse.error('유저-미션 조회 실패');
      res.status(500).json(response);
    }
  };

  completeUserMission = async (req: Request, res: Response) => {
    try {
      const data = new UpdateUserMissionDto(req.params, req.body);
      const result = await this.userMissionService.update(
        data.user_id,
        data.mission_id,
        data.status
      );
      const response = ApiResponse.success('미션 완료 처리 성공', result);
      res.status(200).json(response);
    } catch (err) {
      const response = ApiResponse.error((err as Error).message || '미션 완료 처리 실패');
      res.status(500).json(response);
    }
  };
}
