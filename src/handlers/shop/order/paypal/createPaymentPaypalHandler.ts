import tokenAuthentication from "./TokenAuthentication";
import axios from 'axios';
import config from '../../../../utils/config';

const moduleName = "createPaymentPaypalHandler";

interface Product {
    id?: number;
    price?: number;
}
const createOrderPayment = async (products: Product[], totalAmount: number) => {
    try {

        const productMapped = products.map((item, index) => {
            return {
                name: "Producto " + index,
                description: "Descripción del Producto " + index,
                quantity: 1,
                category: "DIGITAL_GOODS",
                unit_amount: {
                    currency_code: "USD",
                    value: item.price
                }
            }
        });

        const orderDetail = {
            intent: "CAPTURE",

            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: totalAmount
                    },
                },
            ],
            application_context: {
                payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
                brand_name: "Code Crafted Templates",
                landing_page: "NO_PREFERENCE",
                user_action: "PAY_NOW",
                return_url: `${config.host}/api/shop/order/capture_order_payment`,
                cancel_url: `${config.host}/api/shop/order/cancel_order_payment`
            }
        }

        const tokenAuth = await tokenAuthentication();

        const respOrder = await axios.post(`${config.paypalApi}/v2/checkout/orders`, orderDetail, {
            headers: {
                Authorization: `Bearer ${tokenAuth}`
            }
        })


        const { id: paymentId, links } = respOrder.data;
        console.log("data", paymentId, "-", links[1].href);
        return { paymentId, href: links[1].href };

    } catch (error) {
        return { error: error, module: moduleName }
    }

}

export default createOrderPayment;