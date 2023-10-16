const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const nodemailer = require("nodemailer");
import config from "./config";

const createTransporter = async () => {
    try {
        const oauth2Client = new OAuth2(
            config.gmailIdClient,
            config.gmailSecretClient,
            "https://developers.google.com/oauthplayground"
        );

        oauth2Client.setCredentials({
            refresh_token: config.gmailRefreshToken
        });

        const accessToken = await oauth2Client.getAccessToken();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: "OAuth2",
                user: config.senderEmail,
                clientId: config.gmailIdClient,
                clientSecret: config.gmailSecretClient,
                refreshToken: config.gmailRefreshToken,
                accessToken: accessToken
            },
            tls: {
                rejectUnauthorized: false 
            },
            logger: true
        });

        return transporter;
    } catch (error) {
        console.error("Error al crear el transporter:", error);
        throw error;
    }
};

export default createTransporter;

