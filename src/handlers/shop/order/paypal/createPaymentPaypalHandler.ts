import tokenAuthentication from "./TokenAuthentication";
import axios from 'axios';
import config from '../../../../utils/config';

const createOrderPayment = async (totalAmount: number) => {

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

        return { paymentId, href: links[1].href };

}

export default createOrderPayment;