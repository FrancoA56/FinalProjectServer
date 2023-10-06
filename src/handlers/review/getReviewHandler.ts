import { Review } from "../../db";

interface ReviewFilters {
  userEmail?: string;
  presetId?: number;
}

const getReviewHandler = async ({ userEmail, presetId }: ReviewFilters) => {
  const filters: Record<any, any> = {};
  if (userEmail) filters.userEmail = userEmail;
  if (presetId) filters.presetId = presetId;

  const reviews = await Review.findAll({ where: filters });

  const mappedReviews = reviews.map((review) => {
    const data = review.dataValues;
    return {
      email: data.userEmail,
      presetId: data.presetId,
      message: data.ratingMessage,
      rating: data.rating,
    };
  });
  return mappedReviews;
};

export default getReviewHandler;
