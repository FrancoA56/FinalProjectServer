import { Request, Response } from "express";
import editProductHandler from "../../handlers/product/editProductHandler";

const editProductController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    interface Product {
      id?: number;
      name?: string;
      type?: string;
    }
    const { id }: Product = req.params;
    const { name, type }: Product = req.query;
    const product = await editProductHandler(id, name, type);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default editProductController;
