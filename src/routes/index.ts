import { Router } from "express";
import productRouter from "./product";
import shopRouter from "./shop";
import userRouter from "./user";

const router = Router();

router.use("/product", productRouter)
router.use("/shop", shopRouter)
router.use("/user", userRouter)

export default router;
