import { Router } from "express";
import getProductController from "../controllers/product/getProductController";
import addProductController from "../controllers/product/addProductController";
import editProductController from "../controllers/product/editProductController";
import disableProductController from "../controllers/product/disableProductController";

const productRouter = Router();

productRouter.get("/", getProductController);
productRouter.post("/", addProductController)
productRouter.put("/:id", editProductController)
productRouter.delete("/:id", disableProductController)

export default productRouter;
