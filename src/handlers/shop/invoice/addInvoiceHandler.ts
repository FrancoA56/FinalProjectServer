import { Invoice } from "../../../db";
import addInvoiceItem from "./addInvoiceItemHandler";
import deleteOrder from "../order/deleteOrderHandler";

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

) => {

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

};

export default addInvoiceHandler;
