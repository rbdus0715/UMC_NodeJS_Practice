import { IContext } from '../../commons/interfaces/context.interface';
import { ApiResponse } from '../../commons/api-response';
import ReviewService from './review.service';

export default class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  createReview = async (context: IContext) => {
    const { body } = context.req;
    const review = await this.reviewService.create(body);
    const response = ApiResponse.success('리뷰가 생성되었습니다.', review, 201);
    context.res.status(201).json(response);
  }

  fetchReviews = async (context: IContext) => {
    const reviews = await this.reviewService.find();
    const response = ApiResponse.success('조회되었습니다.', reviews, 200);
    context.res.status(200).json(response);
  }
}
