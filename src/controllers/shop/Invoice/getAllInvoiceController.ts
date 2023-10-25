import { Request, Response } from "express";
import getAllInvoiceHandler from "../../../handlers/shop/invoice/getAllInvoiceHandler";

const getAllInvoice = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {

    const purchases = await getAllInvoiceHandler();
    const totalCount = purchases.data.length;
    res.setHeader("X-Total-Count", totalCount);
    
    res.status(200).json(purchases.data);

  } catch (error) {

    res.status(500).json([]);
  }
};

export default getAllInvoice;