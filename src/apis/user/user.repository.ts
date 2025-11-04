import { Pool, RowDataPacket } from 'mysql2/promise';
import { CreateUserDto } from './dto/user.dto';
import User from './entities/user.entity';
import { ulid } from 'ulid';

export default class UserRepository {
  constructor(private readonly pool: Pool) {}

  async create(data: CreateUserDto): Promise<User> {
    const id = ulid();
    const query_string =
      'INSERT INTO user (id, name, gender, birth, email, password, profile_url, location, point, verified, notice_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const [rows] = await this.pool.query<RowDataPacket[]>(query_string, [
      id,
      data.name,
      data.gender,
      data.birth,
      data.email,
      data.password,
      data.profile_url,
      data.location,
      data.point,
      data.verified,
      data.notice_status,
    ]);
    return rows[0] as User;
  }

  async find(): Promise<User[]> {
    const query_string = 'SELECT * FROM user';
    const [rows] = await this.pool.query<RowDataPacket[]>(query_string);
    return rows as User[];
  }

  async findOneById({ id }: { id: string }): Promise<User> {
    const query_string = 'SELECT * FROM user WHERE id = ?';
    const [rows] = await this.pool.query<RowDataPacket[]>(query_string, [id]);
    return rows[0] as User;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const query_string = 'SELECT * FROM user WHERE email = ?';
    const [rows] = await this.pool.query<RowDataPacket[]>(query_string, email);
    return rows.length > 0 ? (rows[0] as User) : null;
  }

  async findOneByNickname(nickname: string): Promise<User | null> {
    const query_string = 'SELECT * FROM user WHERE nickname = ?';
    const [rows] = await this.pool.query<RowDataPacket[]>(
      query_string,
      nickname
    );
    return rows.length > 0 ? (rows[0] as User) : null;
  }
}
