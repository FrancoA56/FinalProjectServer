import axios from "axios";
import config from '../../../../utils/config';

const capturePaymentOrder = async (token: string | undefined) => {

    const response = await axios.post(`${config.paypalApi}/v2/checkout/orders/${token}/capture`, null, {
        auth: {
            username: config.paypalApiClient,
            password: config.paypalApiSecret
        },
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return { isSuccess: true, data: response };

}

export default capturePaymentOrder;