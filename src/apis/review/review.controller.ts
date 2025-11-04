import { IContext } from '../../commons/interfaces/context.interface';
import { ApiResponse } from '../../commons/apiResponse';
import ReviewService from './review.service';
import { Request, Response } from 'express';
import { CreateReviewDto } from './dto/review.dto';

export default class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  createReview = async (req: Request, res: Response) => {
    try {
      const createReviewDto = new CreateReviewDto(req.body);
      const review = await this.reviewService.create(createReviewDto);
      const response = ApiResponse.success('리뷰가 생성되었습니다.', review);
      res.status(201).json(response);
    } catch (error) {
      const response = ApiResponse.success('리뷰 생성에 실패하였습니다.');
      res.status(500).json(response);
    }
  };

  fetchReviews = async (req: Request, res: Response) => {
    try {
      const reviews = await this.reviewService.find();
      const response = ApiResponse.success('모든 조회되었습니다.', reviews);
      res.status(200).json(response);
    } catch (error) {
      const response = ApiResponse.error('모든 리뷰 조회에 실패하였습니다.');
      res.status(500).json(response);
    }
  };
}
