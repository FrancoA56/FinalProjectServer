import { Router } from "express";
import addInvoiceController from "../controllers/shop/addInvoiceController";

const shopRouter = Router();

shopRouter.post("/invoice", addInvoiceController);

export default shopRouter;
