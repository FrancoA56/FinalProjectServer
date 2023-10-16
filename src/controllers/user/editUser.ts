import { Request, Response } from "express";
import editUserHandler from "../../handlers/user/editUserHandler";

const editUser = async (req: Request, res: Response): Promise<void> => {
  try {
    interface User {
      email?: string;
      password?: string;
      name?: string;
      logo?: string;
      about?: string;
      firstname?: string;
      lastname?: string;
      country?: string;
      city?: string;
      zipcode?: string;
    }
    const { email }: User = req.params;
    const loweredEmail = email.toLowerCase();
    
    const {
      password,
      name,
      logo,
      about,
      firstname,
      lastname,
      country,
      city,
      zipcode,
    }: User = req.body;

    const user = await editUserHandler(
      loweredEmail,
      password,
      name,
      logo,
      about,
      firstname,
      lastname,
      country,
      city,
      zipcode
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default editUser;
