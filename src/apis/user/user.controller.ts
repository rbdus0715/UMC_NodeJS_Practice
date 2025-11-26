import UserService from './user.service';
import { ApiResponse } from '../../commons/apiResponse';
import { Request, Response } from 'express';
import ReviewService from '../review/review.service';
import MissionService from '../mission/mission.service';

export class UserController {
  constructor(
    private readonly userService: UserService, //
    private readonly reviewService: ReviewService,
    private readonly missionService: MissionService
  ) {}

  fetchUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.find();
      console.log(users);
      const response = ApiResponse.success(
        '모든 유저의 정보 조회에 성공하였습니다.',
        users
      );
      res.status(200).json(response);
    } catch (error) {
      const response = ApiResponse.error(
        '모든 유저의 정보 조회에 실패하였습니다.'
      );
      res.status(500).json(response);
    }
  };

  fetchUserReviews = async (req: Request, res: Response) => {
    try {
      const reviews = await this.reviewService.findByUserId(
        req.params.user_id,
        String(req.query.cursor || '')
      );
      const response = ApiResponse.success(
        '해당 유저에 대한 리뷰 조회 성공',
        reviews
      );
      res.status(200).json(response);
    } catch (error) {
      const response = ApiResponse.error('해당 유저에 대한 리뷰 조회 실패');
      res.status(500).json(response);
    }
  };

  fetchUserMissions = async (req: Request, res: Response) => {
    try {
      const user_id = req.params.user_id;
      await this.userService.findOneById({id: user_id});
      const missions = await this.missionService.findByUserId(
        user_id,
        String(req.query.cursor || '')
      );
      const response = ApiResponse.success(
        '해당 유저에 대한 미션 조회 성공',
        missions
      );
      res.status(200).json(response);
    } catch (error) {
      const response = ApiResponse.error('해당 유저에 대한 미션 조회 실패');
      res.status(500).json(response);
    }
  };

  fetchUser = async (req: Request, res: Response) => {
    try {
      const user = req.user as any;
      if (!user || !user.id) {
        const response = ApiResponse.error('인증된 사용자 정보를 찾을 수 없습니다.');
        return res.status(401).json(response);
      }
      const userInfo = await this.userService.findOneById({ id: user.id });
      const response = ApiResponse.success(
        '내 정보 조회에 성공하였습니다.',
        userInfo
      );
      res.status(200).json(response);
    } catch (error) {
      const response = ApiResponse.error('내 정보 조회에 실패하였습니다.');
      res.status(500).json(response);
    }
  };
}
