import { Router } from "express";
import getUser from "../controllers/user/getUser";
import login from "../controllers/user/login";
import register from "../controllers/user/register";
import editUser from "../controllers/user/editUser";
import banUser from "../controllers/user/banUser";

const userRouter = Router();

userRouter.get("/:email", getUser);
userRouter.get("/", login); //query
userRouter.post("/register", register);
userRouter.put("/:email", editUser);
userRouter.delete("/:email", banUser);

export default userRouter;
