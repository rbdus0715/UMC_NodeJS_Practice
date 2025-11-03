import { Pool, RowDataPacket } from 'mysql2/promise';
import { CreateMissionInput } from './dto/mission.dto';
import { Mission } from './entities/mission.entity';
import { ulid } from 'ulid';

export default class MissionRepository {
  constructor(private readonly pool: Pool) {}

  async create(data: CreateMissionInput): Promise<Mission> {
    const id = ulid();
    const query_string =
      'INSERT INTO mission (id, restaurant_id, area_id, content, price, point, deadline) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [rows] = await this.pool.query<RowDataPacket[]>(query_string, [
      id,
      data.restaurant_id,
      data.area_id,
      data.content,
      data.price,
      data.point,
      data.deadline,
    ]);
    return rows[0] as Mission;
  }

  async findOneById({ id }: { id: string }): Promise<Mission> {
    const query_string = 'SELECT * FROM mission WHERE id = ?';
    const [rows] = await this.pool.query<RowDataPacket[]>(query_string, [id]);
    return rows[0] as Mission;
  }

  async find(): Promise<Mission[]> {
    const query_string = 'SELECT * FROM mission';
    const [rows] = await this.pool.query<RowDataPacket[]>(query_string);
    return rows as Mission[];
  }
}
