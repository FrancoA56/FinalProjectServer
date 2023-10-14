const nodemailer = require("nodemailer");
import createTransporter from "../../../../utils/emailConfig";
import config from "../../../../utils/config"
import template from "./templateEmail";

const sendMail = async (
    emailClient: string,
    userName: string,
    templateName: string[],
) => {
    try {

        let mailOptions = {
            from: `"Code Crafted Templates" <${config.senderEmail}>`,
            to: `${emailClient}, ${config.senderEmail}`,
            subject: "Purchase Confirmation on Code Crafted Templates",
            text: "",
            html: template(userName, templateName)
        };

        const transporter = await createTransporter();
        const info = await transporter.sendMail(mailOptions);
        console.log(info);
        console.log("Mensaje enviado: %s", info.message);
        console.log("Url del mensaje: %s", nodemailer.getTestMessageUrl(info));
        return { isSuccess: true, messageId: info.messageId };

    } catch (error) {
        console.log({ isSuccess: false, error: (error as Error).message });
    }
}

export default sendMail;