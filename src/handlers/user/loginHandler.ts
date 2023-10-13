import { User } from "../../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../utils/config";
import UserInfo from "../../utils/UserInfo";

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

  const { name, logo, about, firstname, lastname, country, city, zipcode } = user.dataValues;

  if (isCorrect) {
    const userInfo: UserInfo = {
      email,
      name,
      logo,
      about,
      firstname,
      lastname,
      country,
      city,
      zipcode,
    };
    const secretKey = config.secretKey;
    const token = jwt.sign(userInfo, secretKey, { expiresIn: "1h" });

    return token;
  } else throw new Error("The password is incorrect.");
};

export default loginHandler;
