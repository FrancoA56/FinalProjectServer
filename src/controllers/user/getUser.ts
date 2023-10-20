import { Request, Response } from "express";
import getUserHandler from "../../handlers/user/getUserHandler";

enum OrderType {
  NAME = "name",
  CREATED = "CREATED",
}

enum OrderPriority {
  ASC = "a",
  DESC = "d",
}

const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    interface User {
      id?:number;
      name?: string;
      filters?: string;
      orderType?: OrderType;
      orderPriority?: OrderPriority;
    }
    const { id, name, filters, orderType, orderPriority,  }: User = req.query;
    const user = await getUserHandler(id, name, filters, orderType, orderPriority,);
    const totalCount = user.length;
    res.setHeader("X-Total-Count", totalCount);

    console.log(user)
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default getUser;
