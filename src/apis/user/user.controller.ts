import UserService from './user.service';
import { ApiResponse } from '../../commons/apiResponse';
import { Request, Response } from 'express';
import ReviewService from '../review/review.service';

export class UserController {
  constructor(
    private readonly userService: UserService, //
    private readonly reviewService: ReviewService
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
      const response = ApiResponse.success('해당 유저에 대한 리뷰 조회 성공');
      res.status(200).json(response);
    } catch (error) {
      const response = ApiResponse.error('해당 유저에 대한 리뷰 조회 실패');
      res.status(500).json(response);
    }
  };
}
