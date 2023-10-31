import { Request, Response } from "express";
import registerHandler from "../../handlers/user/registerHandler";

const register = async (req: Request, res: Response): Promise<void> => {
  try {
    interface User {
      email?: string;
      password?: string;
      name?: string;
      
    }
    const { email, password, name }: User = req.body;
    const loweredEmail = email.toLowerCase();
    const user = await registerHandler(loweredEmail, password, name);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default register;
