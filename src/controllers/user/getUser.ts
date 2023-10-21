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

interface adminQueries {
  _start?: number;
  _end?: number;
  _order?: OrderPriority;
  _sort?: OrderType;
  id?: number;
  name?: string;
  isDisabled?:boolean;
}

const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { _start, _end, _order, _sort, id, name, isDisabled }: adminQueries = req.query;

    const user = await getUserHandler({ _start, _end, _order, _sort, id, name, isDisabled });
    const totalCount = user.length;
    res.setHeader("X-Total-Count", totalCount);


    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default getUser;
