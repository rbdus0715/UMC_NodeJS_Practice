import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import CreateUserMissionDto from './dto/userMission.dto';

export default class UserMissionRepository {
  constructor(private readonly pool: Pool) {}

  async create(data: CreateUserMissionDto) {
    //     {
    //   "user_id": "01K924XQ0703MBTFQT2VR209CZ",
    //   "mission_id": "01K922WV1E1NYQ3NHC9TBE6G4E",
    //   "restaurant_id": "01K90X74VF849DQFX4F2XGD4F8",
    //   "area_id": "01K924XQ0703MBTFQT2VR209CZ",
    //   "status": 0
    // }
    try {
      const query_string =
        'INSERT INTO user_mission (area_id, mission_id, restaurant_id, status, user_id) VALUES (?, ?, ?, ?, ?)';
      const [result] = await this.pool.query<ResultSetHeader>(query_string, [
        data.area_id,
        data.mission_id,
        data.restaurant_id,
        data.status,
        data.user_id,
      ]);
    } catch (error) {
      throw new Error('미션 생성 실패');
    }
  }

  async find(): Promise<CreateUserMissionDto[]> {
    try {
      const query_string = 'SELECT * FROM user_mission';
      const [rows] = await this.pool.query<RowDataPacket[]>(query_string);
      return rows as CreateUserMissionDto[];
    } catch (error) {
      throw new Error('유저-미션 조회 불가');
    }
  }
}
