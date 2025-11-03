import { IContext } from '../../commons/interfaces/context.interface';
import { ApiResponse } from '../../commons/api-response';
import MissionService from './mission.service';

export default class MissionController {
  constructor(private readonly missionService: MissionService) {}

  createMission = async (context: IContext) => {
    const missionData = context.req.body;
    const newMission = await this.missionService.create(missionData);
    const response = ApiResponse.success(
      '미션이 생성되었습니다.',
      newMission,
      200
    );
    context.res.status(200).json(response);
  };

  fetchMissions = async (context: IContext) => {
    const missions = await this.missionService.find();
    const response = ApiResponse.success('조회되었습니다.', missions, 200);
    context.res.status(200).json(response);
  };
}
