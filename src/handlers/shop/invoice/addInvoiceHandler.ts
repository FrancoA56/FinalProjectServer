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
  totalAmount: number | undefined
): Promise<IResponse> => {

  if (!email || !products || !totalAmount) {
    return { ...ERROR_CODES.INVALID_PARAM, modulo: moduleName };
  }
  try {

    const invoice = await Invoice.create({
      userEmail: email,
      totalAmount,
      paymentMethod: "mercado_pago",
      isPaid: true
    });

    const addItems = await addInvoiceItem(products, invoice.dataValues.id);
    if (!addItems.isSuccess) return addItems;

    await deleteOrder(email, 0, false);

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
