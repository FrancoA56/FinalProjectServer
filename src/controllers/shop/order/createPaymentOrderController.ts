import { Request, Response } from "express";
import addInvoiceHandler from "../../../handlers/shop/invoice/addInvoiceHandler";
import createPaymentPaypal from "../../../handlers/shop/order/paypal/createPaymentPaypalHandler";

const createPayment = async (
    req: Request,
    res: Response) => {

    try {

        interface Param {
            email?: string;
            totalAmount?: number;
            paymentMethod?: string;
        }

        interface Product {
            id?: number;
            price?: number;
        }
        const { products }: { products: Product[] } = req.body;

        const { email, totalAmount, paymentMethod }: Param = req.body;

        let paymentId: string;
        let href: string;
        switch (paymentMethod) {
            case "paypal":
                const respOrder = await createPaymentPaypal(products, totalAmount);
                paymentId = respOrder.paymentId;
                href = respOrder.href;
                break;
        }

        const respInvoice = await addInvoiceHandler(email, products, totalAmount, paymentId, paymentMethod);

        if (!respInvoice.isSuccess) {
            res.status(respInvoice.status).json({ isSuccess: false, error: respInvoice.error });
            return;
        }

        return res.json({ isSuccess: true, href });

    } catch (error) {
        res.status(500).json({ error });
    }
}

const cancelOrder = (
    req: Request,
    res: Response) => {
    res.json('cancel order');
}


export default createPayment;