import { Review } from "../../db";

interface ReviewInfo {
  email?: string;
  presetId?: number;
  ratingMessage?: string;
  rating?: number;
}

const addReviewHandler = async ({
  email,
  presetId,
  ratingMessage,
  rating,
}: ReviewInfo) => {
  if (!email || !presetId || !rating)
    throw new Error("Missing data to post a Review");

  const dupedReview = await Review.findOne({
    where: { userEmail: email, presetId },
  });
  if (dupedReview) throw new Error("You already made a review for that preset!")

  const newReview = await Review.create({
    userEmail: email,
    presetId,
    ratingMessage,
    rating,
  });

  const data = newReview.dataValues;
  return {
    email: data.userEmail,
    presetId: data.presetId,
    message: data.ratingMessage ? data.ratingMessage : "",
    rating: data.rating,
  };
};

export default addReviewHandler;
