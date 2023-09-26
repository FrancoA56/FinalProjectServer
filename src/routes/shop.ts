import { Router } from "express";
import addShopController from "../controllers/shop/addShopController";

const shopRouter = Router();

shopRouter.post("/", addShopController);

export default shopRouter;
