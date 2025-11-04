import { CreateUserDto } from './dto/user.dto';
import User from './entities/user.entity';
import UserRepository from './user.repository';
import bcrypt from 'bcrypt';

export default class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(data: CreateUserDto): Promise<User> {
    // 존재하는 이메일, 닉네임을 가진 유저인지 확인
    let user = await this.userRepository.findOneByEmail(data.email);
    if (user) throw new Error('이미 유저가 존재합니다.');
    user = await this.userRepository.findOneByNickname(data.nickname);
    if (user) throw new Error('이미 유저가 존재합니다.');

    // created_at
    // 비밀번호 해시화
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    // 해시화된 비밀번호로 CreateUserInput 생성
    data.password = hashedPassword;
    return await this.userRepository.create(data);
  }

  async find(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneById({ id }: { id: string }): Promise<User> {
    const result = await this.userRepository.findOneById({ id });
    if (!result) {
      throw new Error(`id: ${id} 인 유저가 존재하지 않습니다.`);
    }
    return result;
  }

  async findOneByEmail({ email }: { email: string }) {
    const result = await this.userRepository.findOneByEmail(email);
    return result;
  }

  async findOneByNickname({ nickname }: { nickname: string }) {
    const result = await this.userRepository.findOneByNickname(nickname);
  }
}
