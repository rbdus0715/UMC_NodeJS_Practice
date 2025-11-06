export class CreateReviewDto {
  id!: string;
  user_id!: string;
  restaurant_id!: string;
  score!: number;
  content!: string;
  constructor(body: any) {
    this.user_id = body.user_id || '';
    this.restaurant_id = body.restaurant_id || '';
    this.score = body.score || 0;
    this.content = body.content || '';
  }
}

export const responseFromReviews = (reviews: any) => {
  return {
    data: reviews,
    pagination: {
      cursor: reviews.length ? reviews[reviews.length - 1].id : null,
    },
  };
};
