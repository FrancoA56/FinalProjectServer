import { Request, Response } from "express";
import addOrderHandler from "../../../handlers/shop/order/addOrderHandler";
import getOrderHandler from "../../../handlers/shop/order/getOrderByEmailHandler";

const addOrderController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    interface Param {
      email?: string;
      products?: Product[]
    }

    interface Product {
      id?: number;
    }
    const { email, products }: Param = req.body;

    await addOrderHandler(email, products);

    const response = await getOrderHandler(email);

    res.status(201).json(response.data);

  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default addOrderController;