import { Review, User, Preset } from "../../db";

interface ReviewFilters {
  id?: number;
  userEmail?: string;
  presetId?: number;
}

const getReviewHandler = async ({ id, userEmail, presetId }: ReviewFilters) => {
  if (id) {
    const reviewById = await Review.findByPk(id);
    const data = reviewById.dataValues;
    return {
      id: data.id,
      email: data.userEmail,
      presetId: data.presetId,
      message: data.ratingMessage,
      rating: data.rating,
    };
  }

  const filters: Record<any, any> = {};
  if (userEmail) filters.userEmail = userEmail;
  if (presetId) filters.presetId = presetId;
  const reviews = await Review.findAll({
    where: filters,
    include: [{
      model: Preset,
      attributes: ['name'],
    },
    {
      model: User,
      attributes: ['name'],
    }]
  });

  return reviews.map((review) => {
    const data = review.dataValues;
    return {
      id: data.id,
      email: data.userEmail,
      presetId: data.presetId,
      message: data.ratingMessage,
      rating: data.rating,
      user: data.user,
      preset: data.preset
    };
  });
};

export default getReviewHandler;
