import { Prisma } from "@prisma/client";

export type ReviewForRestaurantList = Prisma.reviewGetPayload<{
    select: {
      id: true;
      content: true;
      restaurant: true;
      user: true;
    };
  }>;

export type ReviewForUserList = Prisma.reviewGetPayload<{
    select: {
      id: true;
      content: true;
      restaurant: {
        select: {
          id: true;
          name: true;
        };
      };
      score: true;
      created_at: true;
      review_img: true;
      comment: true;
    };
  }>;