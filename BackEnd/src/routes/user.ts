import { Router, Request, Response } from "express";

const userRouter = Router();

userRouter.get("/", (req: Request, res: Response) => {
  res.send("Request to user");
});

export default userRouter;
