import { Request, Response } from "express";
import login0Handler from "../../handlers/user/login0Handler";

const login0 = async (req: Request, res: Response): Promise<void> => {
  try {
    interface User {
      email?: string;
      name?: string;
    }

    let { email, name }: User = req.body;
    if (!email) {
      const nameNormalized = name.replace(/\s/g, "");
      email = `${nameNormalized}@gmail.com`;
    }

    const loweredEmail = email.toLowerCase();
    const user = await login0Handler(loweredEmail, name);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default login0;
