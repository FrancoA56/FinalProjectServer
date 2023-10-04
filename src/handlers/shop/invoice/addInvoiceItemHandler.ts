import { InvoiceItem } from "../../../db";
import ERROR_CODES, { IResponse } from "./errorHandler";

const moduleName = 'addInvoiceItemHandler';

interface Product {
    id?: number;
    price?: number;
}

const addInvoiceItem = async (
    products: Product[],
    idOrder: number
): Promise<IResponse> => {
    try {
        const newParamProducts = products.map(p => ({
            presetId: p.id,
            price: p.price,
            shoppingListId: idOrder
        }));

        const invoiceItem = await InvoiceItem.bulkCreate(newParamProducts);

        if (!invoiceItem) return { ...ERROR_CODES.DATABASE_ERROR, modulo: moduleName }

        return { isSuccess: true }

    } catch (error) {

        return {
            ...ERROR_CODES.CATCH_ERROR,
            error: (error as Error).message,
            modulo: moduleName
        }
    }

}

export default addInvoiceItem;