import { Request, Response } from "express";
import getReviewHandler from "../../handlers/review/getReviewHandler";

interface Review {
  id?: number;
  email?: string;
  presetId?: number;
}

const getReviewController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id, email, presetId }: Review = req.query;
    const reviews = await getReviewHandler({
      id,
      userEmail: email,
      presetId,
    });
    
    let totalCount = 0;
    if (Array.isArray(reviews)) {
      totalCount = reviews.length;
    }

    res.setHeader("X-Total-Count", totalCount);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default getReviewController;
