import { InvoiceItem } from "../../../db";
import ERROR_CODES from "../errorHandler";
import IResponse from "../interfaceResponse";

const moduleName = 'addInvoiceItemHandler';

interface Product {
    id?: number;
    price?: number;
}

const addInvoiceItem = async (
    products: Product[],
    invoiceId: number
): Promise<IResponse> => {
    try {
        const newParamProducts = products.map(p => ({
            presetId: p.id,
            price: p.price,
            invoiceId
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