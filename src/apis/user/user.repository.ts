import { PrismaClient, user } from '@prisma/client';
import { CreateUserDto } from './dto/user.dto';
import { ulid } from 'ulid';

export default class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: CreateUserDto): Promise<user> {
    data.id = ulid();
    return await this.prisma.user.create({ data });
  }

  async find(): Promise<user[]> {
    return await this.prisma.user.findMany();
  }

  async findOneById({ id }: { id: string }): Promise<user | null> {
    return await this.prisma.user.findFirst({ where: { id } });
  }

  async findOneByEmail(email: string): Promise<user | null> {
    return await this.prisma.user.findFirst({ where: { email } });
  }

  async findOneByNickname(nickname: string): Promise<user | null> {
    return await this.prisma.user.findFirst({ where: { nickname } });
  }
}
