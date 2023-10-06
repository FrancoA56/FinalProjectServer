import { Request, Response } from "express";
import addReviewHandler from "../../handlers/review/addReviewHandler";

interface Review {
  email?: string;
  presetId?: number;
  ratingMessage?: string;
  rating?: number;
}

const addReviewController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, presetId, ratingMessage, rating }: Review = req.body;
    const review = await addReviewHandler({
      email,
      presetId,
      ratingMessage,
      rating,
    });
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default addReviewController;
