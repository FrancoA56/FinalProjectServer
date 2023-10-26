import { Request, Response } from "express";
import getInvoiceHandler from "../../../handlers/shop/invoice/getInvoiceByEmailHandler";
import getInvoiceIdHandler from "../../../handlers/shop/invoice/getInvoiceByIdHandler";

const isEmail = (value: string) => {

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

const getInvoiceByEmailController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    interface IParam {
      param?: string;
    }

    const { param }: IParam = req.params;
    let response = null;
    if (isEmail(param)) {

      response = await getInvoiceHandler(param);
    } else {
      response = await getInvoiceIdHandler(Number(param));
    }



    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json([]);
  }
};

export default getInvoiceByEmailController;