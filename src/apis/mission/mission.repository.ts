import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { CreateMissionDto } from './dto/mission.dto';
import { Mission } from './entities/mission.entity';
import { ulid } from 'ulid';

export default class MissionRepository {
  constructor(private readonly pool: Pool) {}

  async create(data: CreateMissionDto): Promise<Mission> {
    try {
      const id = ulid();
      // chapter5 수행하기 위한 코드
      // data.restaurant_id = 01K90WTE6MGHK2PJBM5RKHT29Y;
      // data.area_id = 01HZXYZ123ABCDEF4567890123;
      const query_string =
        'INSERT INTO mission (id, restaurant_id, area_id, content, price, point, deadline) VALUES (?, ?, ?, ?, ?, ?, ?)';
      const [result] = await this.pool.query<ResultSetHeader>(query_string, [
        id,
        data.restaurant_id,
        data.area_id,
        data.content,
        data.price,
        data.point,
        data.deadline,
      ]);
      return data as Mission;
    } catch (error) {
      console.log(error);
      throw new Error('미션 생성 실패');
    }
  }

  async findOneById({ id }: { id: string }): Promise<Mission> {
    const query_string = 'SELECT id FROM mission WHERE id = ?';
    const [rows] = await this.pool.query<RowDataPacket[]>(query_string, [id]);
    return rows[0] as Mission;
  }

  async find(): Promise<Mission[]> {
    const query_string = 'SELECT * FROM mission';
    const [rows] = await this.pool.query<RowDataPacket[]>(query_string);
    return rows as Mission[];
  }
}
