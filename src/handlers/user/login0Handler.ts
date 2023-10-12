import { User } from "../../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../utils/config";

interface UserInfo {
  email: string;
  name: string;
  logo: string;
  about: string;
}

const login0Handler = async (
  email: string | undefined,
  name: string | undefined
) => {
  const user = await User.findOne({ where: { email } });
  if (user) {
    const userInfo: UserInfo = {
      email,
      name: user.dataValues.name,
      logo: user.dataValues.logo,
      about: user.dataValues.about,
    };
    const secretKey = config.secretKey;
    const token = jwt.sign(userInfo, secretKey, { expiresIn: "1h" });
    return token;
  }

  const SALT_ROUNDS: number = 10;

  const password = await bcrypt.hash("auth0user", SALT_ROUNDS);

  const newUser = await User.create({
    email,
    password,
    name,
  });

  const secretKey = config.secretKey;
  const token = jwt.sign(newUser, secretKey, { expiresIn: "1h" });
  return token;
};

export default login0Handler;
