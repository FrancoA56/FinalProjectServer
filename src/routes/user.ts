import { Router } from "express";
import getUser from "../controllers/user/getUser";
import login from "../controllers/user/login";
import register from "../controllers/user/register";
import editUser from "../controllers/user/editUser";
import banUser from "../controllers/user/banUser";
import validateToken from "../controllers/user/validateToken";
import forgorPassword from "../controllers/user/forgotPassword";
import resetPassword from "../controllers/user/resetPassword";

const userRouter = Router();

// userRouter.get("/:email", getUser);
userRouter.get("/", login); //query
userRouter.get("/validate", validateToken);
userRouter.post("/register", register);
// userRouter.get("/forgot",forgorPassword)
// userRouter.put("/reset",resetPassword)
userRouter.put("/:email", editUser);
userRouter.delete("/:email", banUser);

export default userRouter;
