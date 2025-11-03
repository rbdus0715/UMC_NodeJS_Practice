import { IContext } from '../../commons/interfaces/context.interface';
import { ApiResponse } from '../../commons/api-response';
import UserMissionService from './user-mission.service';
import {
  CreateUserMissionInput,
  UpdateUserMissionStatusInput,
} from './dto/user-mission.dto';

export default class UserMissionController {
  constructor(private readonly userMissionService: UserMissionService) {}

  joinMission = async (context: IContext) => {
    const { user_id, mission_id, restaurant_id, area_id, status } =
      context.req.body;
    const input = new CreateUserMissionInput(
      user_id,
      mission_id,
      restaurant_id,
      area_id,
      status
    );
    const result = await this.userMissionService.joinMission(input);
    const response = ApiResponse.success('미션에 참여했습니다.', result, 200);
    context.res.status(200).json(response);
  };

  getUserMissions = async (context: IContext) => {
    const { user_id } = context.req.params;
    const result = await this.userMissionService.getUserMissionsWithDetails({
      user_id,
    });
    const response = ApiResponse.success('조회되었습니다.', result, 200);
    context.res.status(200).json(response);
  };

  getMissionUsers = async (context: IContext) => {
    const { mission_id } = context.req.params;
    const result = await this.userMissionService.getMissionUsersWithDetails({
      mission_id,
    });
    const response = ApiResponse.success('조회되었습니다.', result, 200);
    context.res.status(200).json(response);
  };

  updateStatus = async (context: IContext) => {
    const { user_id, mission_id } = context.req.params;
    const { status } = context.req.body;
    const input = new UpdateUserMissionStatusInput(status);
    const result = await this.userMissionService.updateStatus({
      user_id,
      mission_id,
      data: input,
    });
    const response = ApiResponse.success(
      '상태가 업데이트되었습니다.',
      result,
      200
    );
    context.res.status(200).json(response);
  };

  completeMission = async (context: IContext) => {
    const { user_id, mission_id } = context.req.params;
    const result = await this.userMissionService.completeMission({
      user_id,
      mission_id,
    });
    const response = ApiResponse.success('미션이 완료되었습니다.', result, 200);
    context.res.status(200).json(response);
  };

  delete = async (context: IContext) => {
    const { user_id, mission_id } = context.req.params;
    await this.userMissionService.delete({ user_id, mission_id });
    const response = ApiResponse.success('삭제되었습니다.', undefined, 200);
    context.res.status(200).json(response);
  };

  getAllUserMissions = async (context: IContext) => {
    const result =
      await this.userMissionService.getAllUserMissionsWithDetails();
    const response = ApiResponse.success('조회되었습니다.', result, 200);
    context.res.status(200).json(response);
  };
}
