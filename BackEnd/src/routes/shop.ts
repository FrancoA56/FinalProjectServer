import { Router, Request, Response } from "express";

const shopRouter = Router();

shopRouter.get("/", (req: Request, res: Response) => {
  res.send("Request to shop");
});

export default shopRouter;
