import { Pool } from 'mysql2/promise';
import { Review } from './entities/review.entity';
import { RowDataPacket } from 'mysql2';
import { CreateReviewInput } from './dto/review.dto';
import { ulid } from 'ulid';

export class ReviewRepository {
  constructor(private readonly pool: Pool) {}

  async create(data: CreateReviewInput): Promise<Review> {
    const id = ulid();
    
    const query_string =
      'INSERT INTO review (id, user_id, restaurant_id, score, content, img_url) VALUES (?, ?, ?, ?, ?, ?)';
    await this.pool.query(query_string, [
      id,
      data.user_id,
      data.restaurant_id,
      data.score,
      data.content,
      data.img_url,
    ]);
    return this.findOneById({ id });
  }

  async find(): Promise<Review[]> {
    const query_string = 'SELECT * FROM review';
    const [rows] = await this.pool.query<RowDataPacket[]>(query_string);
    return rows as Review[];
  }

  async findOneById({ id }: { id: string }): Promise<Review> {
    const query_string = 'SELECT * FROM review WHERE id = ?';
    const [rows] = await this.pool.query<RowDataPacket[]>(query_string, [id]);
    return rows[0] as Review;
  }
}
