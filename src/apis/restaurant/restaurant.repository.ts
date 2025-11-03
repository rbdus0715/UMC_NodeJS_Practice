import { Pool, RowDataPacket } from 'mysql2/promise';
import { ulid } from 'ulid';
import { CreateRestaurantInput } from './dto/restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';

export class RestaurantRepository {
  constructor(private readonly pool: Pool) {}

  async create(data: CreateRestaurantInput): Promise<Restaurant> {
    const id = ulid();
    data.area_id = '01HZXYZ123ABCDEF4567890123';
    const query_string =
      'INSERT INTO restaurant (id, area_id, name, phone_number, location, lat, lng) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [rows] = await this.pool.query<RowDataPacket[]>(query_string, [
      id,
      data.area_id,
      data.name,
      data.phone_number,
      data.location,
      data.lat,
      data.lng,
    ]);
    return rows[0] as Restaurant;
  }

  async find(): Promise<Restaurant[]> {
    const query_string = 'SELECT * FROM restaurant';
    const [rows] = await this.pool.query<RowDataPacket[]>(query_string);
    return rows as Restaurant[];
  }

  async findOneById({ id }: { id: string }): Promise<Restaurant> {
    const query_string = 'SELECT * FROM restaurant WHERE id = ?';
    const [rows] = await this.pool.query<RowDataPacket[]>(query_string, [id]);
    return rows[0] as Restaurant;
  }
}
