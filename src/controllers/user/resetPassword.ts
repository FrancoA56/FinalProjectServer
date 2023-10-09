import { Request, Response } from "express";
import resetPasswordHandler from "../../handlers/user/resetPasswordHanlder";

const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    interface User {
      email?: string;
      password?: string;
    }
    const { email, password }: User = req.body;
    const loweredEmail = email.toLowerCase();
    const user = await resetPasswordHandler(loweredEmail, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default resetPassword;
