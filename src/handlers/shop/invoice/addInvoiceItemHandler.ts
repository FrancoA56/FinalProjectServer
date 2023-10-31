import { InvoiceItem } from "../../../db";

interface Product {
    id?: number;
    price?: number;
}

const addInvoiceItem = async (
    products: Product[],
    invoiceId: number
) => {
  
        const newParamProducts = products.map(p => ({
            presetId: p.id,
            price: p.price,
            invoiceId
        }));

        await InvoiceItem.bulkCreate(newParamProducts);

        return { isSuccess: true }
}

export default addInvoiceItem;