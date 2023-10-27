import { Request, Response } from "express";
import capturePaymentOrder from "../../../../handlers/shop/order/paypal/capturePaymentOrderHandler"
import sendEmail from "../../../../handlers/shop/order/sendEmail/sendEmail";
import getInvoiceByPaymentId from "../../../../handlers/shop/invoice/getInvoiceByPaymentId";
import UpdatePaymentStatus from "../../../../handlers/shop/invoice/UpdatePaymentStatusHandler";
import template from "../../../../templates/responsePaymentSuccessFul";
import templateError from "../../../../templates/responsePaymentError";

const templateSuccessful = template();
const templateErr = templateError();

interface IProduct {
    dataValues: {
        preset: {
            dataValues: {
                presetName?: string
            }
        }
    }
}

const captureOrder = async (
    req: Request,
    res: Response) => {


    try {

        const token = req.query.token;

        if (typeof token === 'string') {
            await capturePaymentOrder(token);

            await UpdatePaymentStatus(token, false, null);

            const invoice = await getInvoiceByPaymentId(token);

            const userEmail = invoice.data.userEmail;
            const userName = invoice.data.user.dataValues.userName;
            const products = invoice.data.invoiceItems.map((product: IProduct) => product.dataValues.preset.dataValues.presetName)

            await sendEmail(userEmail, userName, products, "paypal", null);
        }

        res.send(templateSuccessful);

    } catch (error) {

        res.status(500).send(templateErr);
    }
}

export default captureOrder;
