import { Request, Response } from "express";
import loginHandler from "../../handlers/user/loginHandler";

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    interface User {
      email?: string;
      password?: string;
    }
    const { email, password }: User = req.query;
    const user = await loginHandler(email, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default login;
