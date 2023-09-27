import { Request, Response } from "express";
import addProductHandler from "../../handlers/product/addProductHandler"

const addProductController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    interface Product {
      id?: number;
      name?: string;
      type?: string;
    }
    const { id, name, type }: Product = req.body;
    const product = await addProductHandler(id, name, type);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default addProductController;
