import { Request, Response } from "express";
import forgotPasswordHandler from "../../handlers/user/forgotPasswordHandler";

const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    interface User {
      email?: string;
    }
    const { email }: User = req.body;
    const loweredEmail = email.toLowerCase();
    const user = await forgotPasswordHandler(loweredEmail);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default forgotPassword;
