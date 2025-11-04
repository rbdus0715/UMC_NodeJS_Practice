export class CreateReviewDto {
  id!: string;
  user_id!: string;
  restaurant_id!: string;
  score!: number;
  content!: string;
  img_url!: string | null;
  constructor(body: any) {
    this.user_id = body.user_id || '';
    this.restaurant_id = body.restaurant_id || '';
    this.score = body.score || 0;
    this.content = body.content || '';
    this.img_url = body.img_url;
  }
}
