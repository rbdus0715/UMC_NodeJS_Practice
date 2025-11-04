import { IContext } from '../../commons/interfaces/context.interface';
import { ApiResponse } from '../../commons/apiResponse';
import MissionService from './mission.service';
import { Request, Response } from 'express';
import { CreateMissionDto } from './dto/mission.dto';

export default class MissionController {
  constructor(private readonly missionService: MissionService) {}

  createMission = async (req: Request, res: Response): Promise<void> => {
    try {
      const createMissionDto = new CreateMissionDto(req.body);
      const newMission = await this.missionService.create(createMissionDto);
      console.log(newMission);
      const response = ApiResponse.success(
        '미션이 생성되었습니다.',
        newMission
      );
      res.status(201).json(response);
    } catch (err) {
      // const response = ApiResponse.error('미션 생성에 실패했습니다.');
      const response = ApiResponse.error((err as Error).message);
      res.status(500).json(response);
    }
  };

  fetchMissions = async (context: IContext): Promise<void> => {
    const missions = await this.missionService.find();
    const response = ApiResponse.success('조회되었습니다.', missions);
    context.res.status(200).json(response);
  };
}
