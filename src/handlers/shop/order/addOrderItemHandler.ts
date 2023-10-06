import { OrderItem } from "../../../db";
import ERROR_CODES from "../errorHandler";
import IResponse from "../interfaceResponse";

const moduleName = 'addInvoiceItemHandler';

interface IProduct {
    id?: number;
}

const addInvoiceItem = async (
    idOrder: number,
    products: IProduct[]
    
): Promise<IResponse> => {
    try {

        const newParamProducts = products.map(p => ({
            presetId: p,
            orderId: idOrder
        }));

        const orderItem  = await OrderItem.bulkCreate(newParamProducts);

        if (!orderItem) return { ...ERROR_CODES.DATABASE_ERROR, modulo: moduleName }

        return { isSuccess: true, data: orderItem }

    } catch (error) {

        return {
            ...ERROR_CODES.CATCH_ERROR,
            error: (error as Error).message,
            modulo: moduleName
        }
    }

}

export default addInvoiceItem;