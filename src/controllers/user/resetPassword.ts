import { Request, Response } from "express";
import resetPasswordHandler from "../../handlers/user/resetPasswordHanlder";

const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const token: string = req.params.token
    const password: string = req.body.password;

    const user = await resetPasswordHandler(token, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default resetPassword;
