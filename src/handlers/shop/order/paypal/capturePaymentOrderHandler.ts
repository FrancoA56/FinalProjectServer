import axios from "axios";
import config from '../../../../utils/config';
import ERROR_CODES from "../../errorHandler";

const moduleName = "capturePaymentOrderHandler";


const capturePaymentOrder = async (token: string | undefined) => {
    try {
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

    } catch (error) {
        return {
            ...ERROR_CODES.CATCH_ERROR,
            error: (error as Error).message,
            modulo: moduleName
        }
    }

}

export default capturePaymentOrder;