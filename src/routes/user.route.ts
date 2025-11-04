import { UserController } from '../apis/user/user.controller';
import UserRepository from '../apis/user/user.repository';
import UserService from '../apis/user/user.service';
import pool from '../config/db.config';
import express from 'express';

const userRouter = express.Router();
const userRepository = new UserRepository(pool);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.get('/', userController.fetchUsers);

export default userRouter;
