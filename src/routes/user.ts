import { Router } from "express";
import getUser from "../controllers/user/getUser";
import login from "../controllers/user/login";
import register from "../controllers/user/register";
import editUser from "../controllers/user/editUser";
import banUser from "../controllers/user/banUser";
import validateToken from "../controllers/user/validateToken";
import forgotPassword from "../controllers/user/forgotPassword";
import resetPassword from "../controllers/user/resetPassword";
import login0 from "../controllers/user/login0";

const userRouter = Router();

userRouter.get("/", login); //query
userRouter.get("/admin", getUser);
userRouter.get("/validate", validateToken);
userRouter.post("/forgot",forgotPassword)
userRouter.post("/login0", login0);
userRouter.post("/register", register);
userRouter.put("/reset/:token",resetPassword)
userRouter.put("/:email", editUser);
userRouter.delete("/admin/:email", banUser);

export default userRouter;
