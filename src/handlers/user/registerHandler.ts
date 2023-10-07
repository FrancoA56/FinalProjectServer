import { User } from "../../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../utils/config";

interface UserInfo {
  email: string;
  name: string;
}

const registerHandler = async (
  email: string | undefined,
  password: string | undefined,
  name: string | undefined
) => {
  if (!email || !password || !name) {
    throw new Error("Missing data.");
  }
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("User already exist.");
  }
  const SALT_ROUNDS: number = 10;

  const hashedPass = await bcrypt.hash(password, SALT_ROUNDS);

  password = hashedPass;

  const newUser = await User.create({
    email,
    password,
    name
  });
  
  const userInfo: UserInfo = {
    email: newUser.dataValues.email,
    name: newUser.dataValues.name,
  };
  const secretKey = config.secretKey;
  const token = jwt.sign(userInfo, secretKey, { expiresIn: "1h" });

  return token;
};

export default registerHandler;
