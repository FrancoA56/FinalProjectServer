import { Request, Response } from "express";
import getOrderHandler from "../../../handlers/shop/order/getOrderByEmailHandler";

const getOrderByEmailController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    interface IParam {
      email?: string;
    }

    const { email }: IParam = req.query;

    const response = await getOrderHandler(email);
    
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json([]);
  }
};

export default getOrderByEmailController;