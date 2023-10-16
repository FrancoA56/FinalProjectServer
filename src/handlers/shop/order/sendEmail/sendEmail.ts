const nodemailer = require("nodemailer");
import createTransporter from "../../../../utils/emailConfig";
import config from "../../../../utils/config"
import templateEmailPaypal from "../../../../templates/emailResponsePurchase";
import templateEmailInfoBT from "../../../../templates/emailInfoBankTransfer";



const sendMail = async (
    emailClient: string,
    userName: string,
    templateName: string[],
    paymentMethod: string,
    totalAmount: number
) => {

    const html = paymentMethod === "paypal" ?
        templateEmailPaypal(userName, templateName) :
        templateEmailInfoBT(userName, totalAmount)

        const subject= paymentMethod ==="paypal" ?
        "Purchase Confirmation on Code Crafted Templates" :
        "The bank details for you to make the payment for your purchase";

    let mailOptions = {
        from: `"Code Crafted Templates" <${config.senderEmail}>`,
        to: `${emailClient}, ${config.senderEmail}`,
        subject: subject,
        text: "",
        html: html
    };

    const transporter = await createTransporter();
    const info = await transporter.sendMail(mailOptions);

    return { isSuccess: true, messageId: info.messageId };
}

export default sendMail;
