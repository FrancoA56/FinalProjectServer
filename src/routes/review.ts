import { Router } from "express";
import getReviewController from "../controllers/review/getReviewController";
import addReviewController from "../controllers/review/addReviewController";

const reviewRouter = Router();

reviewRouter.get("/", getReviewController);
reviewRouter.post("/", addReviewController);

export default reviewRouter;
