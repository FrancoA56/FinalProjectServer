import { Request, Response } from "express";
import banUserHandler from "../../handlers/user/banUserHandler";

const banUser = async (req: Request, res: Response): Promise<void> => {
  try {
    interface User {
      email?: string;
    }
    const { email }: User = req.params;
    const loweredEmail = email.toLowerCase();

    const bannedUser = await banUserHandler(loweredEmail);
    res.status(200).json(bannedUser);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default banUser;
