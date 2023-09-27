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
    interface Product {
      id?: number;
      quantity?: number;
    }
    const { products }: { products: Product[] } = req.body;
    const { email }: User = req.body;
    const product = await addShopHandler(email, products);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default addShopController;
