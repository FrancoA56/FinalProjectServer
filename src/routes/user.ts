import { Router } from "express";
import getUser from "../controllers/user/getUser";
import login from "../controllers/user/login";
import register from "../controllers/user/register";
import editUser from "../controllers/user/editUser";
import banUser from "../controllers/user/banUser";

const userRouter = Router();

userRouter.get("/:mail", getUser);
userRouter.get("/", login); //query
userRouter.post("/register", register);
userRouter.put("/", editUser);
userRouter.delete("/:mail", banUser);

export default userRouter;
