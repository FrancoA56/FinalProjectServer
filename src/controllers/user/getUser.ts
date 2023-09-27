import { Request, Response } from "express";
import getUserHandler from "../../handlers/user/getUserHandler";

const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    interface User {
      email?: string;
    }
    const { email }: User = req.params;
    const user = await getUserHandler(email);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default getUser;
