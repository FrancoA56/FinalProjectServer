import { Request, Response } from "express";
import getInvoiceHandler from "../../../handlers/shop/invoice/getInvoiceByEmailHandler";

const getInvoiceByEmailController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    interface IParam {
      email?: string;
    }

    const { email }: IParam = req.params;

    const response = await getInvoiceHandler(email);
    
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json([]);
  }
};

export default getInvoiceByEmailController;