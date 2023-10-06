import { Request, Response } from "express";
import addOrderHandler from "../../handlers/shop/order/addOrderHandler";

const addOrderController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    interface Param {
      email?: string;
      products?:Product[]
    }

    interface Product {
      id?: number;
    }
    const { email, products }: Param = req.body;

    const response = await addOrderHandler(email, products);

    if (!response.isSuccess) {
      res.status(response.status).json({ isSuccess: false, error: response.error });
      return;
    }

    res.status(201).json({ isSuccess: true });
  } catch (error) {
    res.status(500).json({ isSuccess: false, error: (error as Error).message });
  }
};

export default addOrderController;