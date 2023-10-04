import { Invoice } from "../../../db";
import addInvoiceItem from "./addInvoiceItemHandler";
import ERROR_CODES, { IResponse } from "./errorHandler";

const moduleName = 'addInvoiceHandler';

interface Product {
  id?: number;
  price?: number;
}

const addInvoiceHandler = async (
  email: string | undefined,
  products: Product[] | undefined,
  totalAmount: number | undefined
): Promise<IResponse> => {

  if (!email || !products || !totalAmount) {
    return { ...ERROR_CODES.INVALID_PARAM, modulo: moduleName };
  }
  try {

    const invoice = await Invoice.create({
      userEmail: email,
      totalAmount,
      paymentMethod:"mercado_pago",
      isPayed:true
    });

    const addItems = await addInvoiceItem(products, invoice.dataValues.id);
    if (!addItems.isSuccess) return addItems;
 
    return { isSuccess: true };

  } catch (error) {
    return {
      ...ERROR_CODES.CATCH_ERROR,
      error: (error as Error).message,
      modulo: moduleName
    }
  }
};

export default addInvoiceHandler;
