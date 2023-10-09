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

const loginHandler = async (
  email: string | undefined,
  password: string | undefined
) => {
  if (!email || !password) throw new Error("Missing data.");

  const user = await User.findOne({ where: { email } });

  if (!user) throw new Error("User doesn't exist.");

  const ban = user.dataValues.isDisabled;

  if (ban) throw new Error("User is banned.");

  const isCorrect = await bcrypt.compare(password, user.dataValues.password);
  
  if (isCorrect) {
    const userInfo: UserInfo = {
      email,
      name: user.dataValues.name,
      logo: user.dataValues.logo,
      about: user.dataValues.about,
    };
    const secretKey = config.secretKey;
    const token = jwt.sign(userInfo, secretKey, { expiresIn: "3600" });

    return token;
  } else throw new Error("The password is incorrect.");
};

export default loginHandler;
