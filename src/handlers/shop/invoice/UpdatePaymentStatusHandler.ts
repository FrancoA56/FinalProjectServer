import { Invoice } from "../../../db";

const addInvoiceHandler = async (
    paymentId: string | undefined,
) => {

    await Invoice.update(
        { isPaid: true },
        { where: { paymentId } }
    );

    return { isSuccess: true };
};

export default addInvoiceHandler;