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
    console.log(response);
    if (!response.isSuccess) {
      res.status(response.status).json({ isSuccess: false, error: response.error });
      return;
    }

    res.status(200).json({ isSuccess: true, data: response });
  } catch (error) {
    res.status(500).json({ isSuccess: false, error: (error as Error).message });
  }
};

export default getOrderByEmailController;