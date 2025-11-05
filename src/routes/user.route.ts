import { UserController } from '../apis/user/user.controller';
import UserRepository from '../apis/user/user.repository';
import UserService from '../apis/user/user.service';
import express from 'express';
import { prisma } from '../config/db.config';

const userRouter = express.Router();
const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.get('/', userController.fetchUsers);

export default userRouter;
