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
userRouter.get("/validate", validateToken);
userRouter.get("/:email", getUser);
userRouter.post("/login0", login0);
userRouter.post("/register", register);
// userRouter.get("/forgot",forgotPassword)
// userRouter.put("/reset",resetPassword)
userRouter.put("/:email", editUser);
userRouter.delete("/:email", banUser);

export default userRouter;
