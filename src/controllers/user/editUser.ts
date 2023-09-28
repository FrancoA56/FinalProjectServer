import { Request, Response } from "express";
import editUserHandler from "../../handlers/user/editUserHandler";

const editUser = async (req: Request, res: Response): Promise<void> => {
  try {
    interface User {
      email?: string;
      password?: string;
      name?: string;
      logo?: string;
    }
    const { email }: User = req.params;
    const { password, name, logo }: User = req.body;
    const user = await editUserHandler(email, password, name, logo);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default editUser;
