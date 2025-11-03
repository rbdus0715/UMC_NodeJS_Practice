export class CreateReviewInput {
  id!: string;
  user_id!: string;
  restaurant_id!: string;
  score!: number;
  content!: string;
  img_url!: string;
  constructor(
    user_id: string,
    restaurant_id: string,
    score: number,
    content: string,
    img_url: string
  ) {
    this.user_id = user_id;
    this.restaurant_id = restaurant_id;
    this.score = score;
    this.content = content;
    this.img_url = img_url;
  }
}
