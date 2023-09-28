import { Router } from "express";
import presetRouter from "./preset";
import shopRouter from "./shop";
import userRouter from "./user";

const router = Router();

router.use("/preset", presetRouter)
router.use("/shop", shopRouter)
router.use("/user", userRouter)

export default router;
