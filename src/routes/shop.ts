import { Router } from "express";
import addInvoiceController from "../controllers/shop/addInvoiceController";
import addOrderController from "../controllers/shop/addOrderController";

const shopRouter = Router();

shopRouter.post("/invoice", addInvoiceController);
shopRouter.post("/order", addOrderController);

export default shopRouter;
