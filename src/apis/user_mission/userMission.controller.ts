import { Request, Response } from 'express';
import UserMissionService from './userMission.service';
import CreateUserMissionDto from './dto/userMission.dto';
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
}
