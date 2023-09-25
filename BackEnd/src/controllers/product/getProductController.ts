import { Request, Response } from "express";
import getProductHandler from "../../handlers/product/getProductHandler";

const getProductController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    interface Product {
      id?: number;
    }
    const { id }: Product = req.query;
    const products = await getProductHandler(id);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default getProductController;
