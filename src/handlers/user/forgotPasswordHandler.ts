import config from "../../utils/config";
import { User } from "../../db";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import createTransporter from "../../utils/emailConfig";
const { secretKey, cors: baseUrl, urlClient } = config;

const forgotPasswordHandler = async (email: string | undefined) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Email doesn't exist.");

  const token = jwt.sign({ email }, secretKey, { expiresIn: "1h" });

  const transporter = await createTransporter();

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
    <p style = "font-size: 15px;">Click <a href="https://codecraftedtemplates.vercel.app/reset-password/${token}" target=”_blank” >This Link</a> to recover your password.</p>
    <p style = "font-size: 15px;">If you did not request this change, please ignore this email.</p>
      <br />
    <h4 style = "font-size: 13px;">Sincerely,</h4>
    <h3>The Codecrafted Templates team</h3>
    `,
  };

  await transporter.sendMail(mailOptions);

  return email;
};

export default forgotPasswordHandler;
