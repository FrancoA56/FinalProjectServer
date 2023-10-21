import { Request, Response } from "express";
import addInvoiceHandler from "../../../handlers/shop/invoice/addInvoiceHandler";
import createPaymentPaypal from "../../../handlers/shop/order/paypal/createPaymentPaypalHandler";
import sendEmail from "../../../handlers/shop/order/sendEmail/sendEmail";

const createPayment = async (
    req: Request,
    res: Response) => {

    try {

        interface Param {
            email?: string;
            totalAmount?: number;
            paymentMethod?: string;
            name?: string
        }

        interface Product {
            id?: number;
            price?: number;
            name?: string
        }
        const { products }: { products: Product[] } = req.body;

        const { email, totalAmount, paymentMethod, name }: Param = req.body;

        let paymentId: string = null;
        let href: string = "";

        switch (paymentMethod) {

            case "paypal":
                const respOrder = await createPaymentPaypal(totalAmount);
                paymentId = respOrder.paymentId;
                href = respOrder.href;
                break;

            case "bank_transfer":
                const productsName = products.map((product: Product) => product.name);
                await sendEmail(email, name, productsName, paymentMethod, totalAmount);
                break;

            default: return res.status(500).json({ isSuccess: false, error: "Unknown payment method" });
        }

        await addInvoiceHandler(email, products, totalAmount, paymentId, paymentMethod);

        return res.json({ isSuccess: true, href });

    } catch (error) {

        res.status(500).json({isSuccess: false, error: (error as Error).message });
    }
}


export default createPayment;