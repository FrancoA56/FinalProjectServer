import { Router } from "express";
import presetRouter from "./preset";
import shopRouter from "./shop";
import userRouter from "./user";
import reviewRouter from "./review";

const router = Router();

router.use("/preset", presetRouter)
router.use("/shop", shopRouter)
router.use("/user", userRouter)
router.use("/review", reviewRouter)

export default router;
