import { Invoice } from "../../../db";
import ERROR_CODES from "../errorHandler";
import IResponse from "../interfaceResponse";

const moduleName = 'addInvoiceHandler';

interface Product {
    id?: number;
    price?: number;
}

const addInvoiceHandler = async (
    paymentId: string | undefined,


): Promise<IResponse> => {

    if (!paymentId) {
        return { ...ERROR_CODES.INVALID_PARAM, modulo: moduleName };
    }
    try {

        await Invoice.update(
            { isPaid: true },
            { where: { paymentId } }
        );

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