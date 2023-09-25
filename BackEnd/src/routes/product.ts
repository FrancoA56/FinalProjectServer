import { Router, Request, Response } from "express";

const productRouter = Router();

productRouter.get("/", (req: Request, res: Response) => {
  res.send("Request to product");
});

export default productRouter;
