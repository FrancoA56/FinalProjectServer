import { Invoice } from "../../../db";

const addInvoiceHandler = async (
    paymentId: string | undefined,
    fromAdmin: boolean,
    status: boolean
) => {

    if (fromAdmin) {
        await Invoice.update(
            { isPaid: status },
            { where: { id: paymentId } }
        );
        return { id: paymentId }

    } else {
        await Invoice.update(
            { isPaid: true },
            { where: { paymentId } }
        );
    }

    return { isSuccess: true };
};

export default addInvoiceHandler;