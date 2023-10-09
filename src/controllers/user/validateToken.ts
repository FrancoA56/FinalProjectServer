import { Request, Response } from "express";
import validateTokenHandler from "../../handlers/user/validateTokenHandler";

const validateToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.header("Authorization");

    const access = await validateTokenHandler(token);

    res.status(200).json(access);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default validateToken;
