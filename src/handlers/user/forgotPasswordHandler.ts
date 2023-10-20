import config from "../../utils/config";
import { User } from "../../db";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
const  {secretKey, cors: baseUrl} = config;

const forgotPasswordHandler = async (email: string | undefined) => {
  
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Email doesn't exist.");


  const token = jwt.sign({ email }, secretKey, { expiresIn: "1h" });

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
      "Link to recover your account Codecrafted Templates - The Final Project",
    html: `
    <img src="https://res.cloudinary.com/codecrafttemplates/image/upload/v1697045472/codeCraft/grid_landscape_csf84w.jpg" 
      alt="Logo Codecrafted Templates" 
      style="width: 95%; height: auto; display: block; justify-content: center; border: 6px solid rgba(94, 195, 191, 1);">
      <br />
    <h2>¡Hello!</h2>
      <br />
    <p style = "font-size: 15px;">Click <a href="${baseUrl}/reset-password/${token}" target=”_blank” >This Link</a> to recover your password.</p>
    <p style = "font-size: 15px;">If you did not request this change, please ignore this email.</p>
      <br />
    <h4 style = "font-size: 13px;">Sincerely,</h4>
    <h3>The Codecrafted Templates team</h3>
    `
  };

  await transporter.sendMail(mailOptions)

  return email
};

export default forgotPasswordHandler;
