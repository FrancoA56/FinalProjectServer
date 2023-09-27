import { Request, Response } from "express";
import disableProductHandler from "../../handlers/product/disableProductHandler";

const disableProductController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    interface Product {
      id?: number;
    }
    const { id }: Product = req.params;
    const product = await disableProductHandler(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default disableProductController;
