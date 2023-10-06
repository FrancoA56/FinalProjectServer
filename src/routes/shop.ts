import { Router } from "express";
import addInvoiceController from "../controllers/shop/addInvoiceController";
import addOrderController from "../controllers/shop/addOrderController";
import getOrderByEmailController from "../controllers/shop/getOrderByEmailController";

const shopRouter = Router();

shopRouter.post("/invoice", addInvoiceController);
shopRouter.get("/order", getOrderByEmailController);
shopRouter.post("/order", addOrderController);

export default shopRouter;
