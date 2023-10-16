import { Invoice } from "../../../db";
import addInvoiceItem from "./addInvoiceItemHandler";
import deleteOrder from "../order/deleteOrderHandler";
import ERROR_CODES from "../errorHandler";
import IResponse from "../interfaceResponse";

const moduleName = 'addInvoiceHandler';

interface Product {
  id?: number;
  price?: number;
}

const addInvoiceHandler = async (
  email: string | undefined,
  products: Product[] | undefined,
  totalAmount: number | undefined,
  paymentId: string,
  paymentMethod: string

): Promise<IResponse> => {

  if (!email || !products || !totalAmount) {
    return { ...ERROR_CODES.INVALID_PARAM, modulo: moduleName };
  }
  try {

    const invoice = await Invoice.create({
      userEmail: email,
      totalAmount,
      paymentMethod,
      isPaid: false,
      paymentId
    });

    const addItems = await addInvoiceItem(products, invoice.dataValues.id,);
    if (!addItems.isSuccess) return addItems;

    await deleteOrder(email, null, null, true);

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
