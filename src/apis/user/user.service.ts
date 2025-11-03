import { CreateUserInput } from './dto/user.dto';
import User from './entities/user.entity';
import UserRepository from './user.repository';
import bcrypt from 'bcrypt';

export default class UserService {
  constructor(private readonly userRepository: UserRepository) {}

    async create(data: CreateUserInput): Promise<User> {
        // 비밀번호 해시화
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        
        // 해시화된 비밀번호로 CreateUserInput 생성
        const userData = new CreateUserInput(
            data.name,
            data.gender,
            data.birth,
            data.email,
            hashedPassword,
            data.profile_url,
            data.location,
            data.point,
            data.verified,
            data.notice_status
        );
        
        return await this.userRepository.create(userData);
    }

  async find(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneById({ id }: { id: string }): Promise<User> {
    return await this.userRepository.findOneById({ id });
  }
}
