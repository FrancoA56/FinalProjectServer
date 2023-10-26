import { Invoice } from "../../../db";

const addInvoiceHandler = async (
    paymentId: string | undefined,
    fromAdmin: boolean
) => {


    if (fromAdmin) {
        const invoice = await Invoice.findOne({
            where: { id: paymentId }
        });

        const newIsPaid = !invoice.dataValues.isPaid;

        await Invoice.update(
            { isPaid: newIsPaid },
            { where: { id: paymentId } }
        );
        return invoice.dataValues

    } else {
        await Invoice.update(
            { isPaid: true },
            { where: { paymentId } }
        );
    }

    return { isSuccess: true };
};

export default addInvoiceHandler;