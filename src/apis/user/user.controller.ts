import UserService from './user.service';
import { ApiResponse } from '../../commons/apiResponse';
import { Request, Response } from 'express';

export class UserController {
  constructor(private readonly userService: UserService) {}

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
}
