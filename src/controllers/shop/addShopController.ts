import { Request, Response } from "express";
import addShopHandler from "../../handlers/shop/addShopHandler";

const addShopController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    interface User {
      email?: string;
    }
    interface Amount {
      totalAmount?: number;
    }
    interface Product {
      id?: number;
      price?: number;
    }
    const { products }: { products: Product[] } = req.body;
    const { email }: User = req.body;
    const { totalAmount }: Amount = req.body;

    const product = await addShopHandler(email, products, totalAmount);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default addShopController;
