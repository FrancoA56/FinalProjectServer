import config from '../../../../utils/config';
import axios from 'axios';
import { URLSearchParams } from "url";

const tokenAuthentication = async () => {
    try {

        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');

        const { data: { access_token } } = await axios.post(`${config.paypalApi}/v1/oauth2/token`, params, {
            auth: {
                username: config.paypalApiClient,
                password: config.paypalApiSecret
            }
        });

        return access_token;

    } catch (error) {

    }

}

export default tokenAuthentication;