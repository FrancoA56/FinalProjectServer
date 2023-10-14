import config from "../../utils/config";
import { User } from "../../db";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const forgotPasswordHandler = async (email: string | undefined) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Email doesn't exist.");

  const  secretKey = config.secretKey;

  const token = jwt.sign({ email }, secretKey, { expiresIn: "2m" });

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: "codeCraftedTemplates@gmail.com",
      clientId:
        "11357259828-esjp5c9sguhji3jmvrovkdpctpa1klep.apps.googleusercontent.com",
      clientSecret: "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",
      refreshToken:
        "1//04d8yXz7Mze8jCgYIARAAGAQSNwF-L9Ir5DFkdXDX3iupf3PBruqd8bWh-63CWvWpRgZU9BrR0J-Bfzvvw7Y5sZgzL83v8eKeH2k",
      accessToken:
        "ya29.a0AfB_byAGmUus-HeGdP2EuYdzKaHRx2SuoOTuyuN2j_btZya1Bcjju2zhP9izLWvp1lbRGYWvyipPIfqZUFH5qeo5RDfq0W32lks2NkkRMsyKlUrshyBpgriqfW-XjsxoKBGGtkJ2FVXvbJfZlSiI9M3-XMURaAIXPXYlaCgYKAfsSAQ8SFQGOcNnCry4LhcjAEaMq9Wv-GGnXDA0171",
      expires: 1484314697598,
    },
  });

  const mailOptions = {
    from: `codeCraftedTemplates@gmail.com`,
    to: `${email}`,
    subject:
      "Link to recover your account Codecrafted Templates – The Final Project",
    text: `localhost:3000/reset-password/${token}`,
  };

  console.log(mailOptions);
  await transporter.sendMail(mailOptions)

  return email
};

export default forgotPasswordHandler;
