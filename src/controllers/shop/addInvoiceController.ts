import { Request, Response } from "express";
import addInvoiceHandler from "../../handlers/shop/invoice/addInvoiceHandler";

const addInvoiceController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    interface Param {
      email?: string;
      totalAmount?: number;
    }

    interface Product {
      id?: number;
      price?: number;
    }
    const { products }: { products: Product[] } = req.body;
    
    const { email, totalAmount }: Param = req.body;

    const response = await addInvoiceHandler(email, products, totalAmount);

    if (!response.isSuccess) {
      res.status(response.status).json({ isSuccess: false, error: response.error });
      return;
    }

    res.status(201).json({ isSuccess: true });
  } catch (error) {
    res.status(500).json({ isSuccess: false, error: (error as Error).message });
  }
};

export default addInvoiceController;
