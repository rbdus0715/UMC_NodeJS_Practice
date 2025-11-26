import { user } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import UserRepository from './user.repository';
import bcrypt from 'bcrypt';
import { UserNotFoundError } from '../../commons/error';

export default class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(data: CreateUserDto): Promise<user> {
    let user = await this.userRepository.findOneByEmail(data.email);
    if (user) throw new Error('이미 유저가 존재합니다.');
    user = await this.userRepository.findOneByNickname(data.nickname);
    if (user) throw new Error('이미 유저가 존재합니다.');

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    data.password = hashedPassword;
    return await this.userRepository.create(data);
  }

  async find(): Promise<user[]> {
    const result = await this.userRepository.find();
    if (!result || result?.length == 0) throw new Error('유저 조회 실패');
    return result;
  }

  // 미션 2
  async findOneById({ id }: { id: string }): Promise<user> {
    const result = await this.userRepository.findOneById({ id });
    if (!result) throw new UserNotFoundError(id);
    return result;
  }

  async findOneByEmail({ email }: { email: string }): Promise<user> {
    const result = await this.userRepository.findOneByEmail(email);
    if (!result)
      throw new Error(`email: ${email} 인 유저가 존재하지 않습니다.`);
    return result;
  }

  async findOneByNickname({ nickname }: { nickname: string }): Promise<user> {
    const result = await this.userRepository.findOneByNickname(nickname);
    if (!result)
      throw new Error(`nickname: ${nickname} 인 유저가 존재하지 않습니다.`);
    return result;
  }

  async update(id: string, data: UpdateUserDto): Promise<user> {
    await this.findOneById({ id }); // 사용자 존재 확인

    // 닉네임 중복 체크 (변경하려는 경우)
    if (data.nickname) {
      const existingUser = await this.userRepository.findOneByNickname(data.nickname);
      if (existingUser && existingUser.id !== id) {
        throw new Error('이미 사용 중인 닉네임입니다.');
      }
    }

    // 비밀번호 해시 처리 (변경하려는 경우)
    const updateData: Partial<user> = { ...data };
    if (data.password) {
      const saltRounds = 10;
      updateData.password = await bcrypt.hash(data.password, saltRounds);
    }

    return await this.userRepository.update(id, updateData);
  }
}
