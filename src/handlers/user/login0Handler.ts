import { User } from "../../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../utils/config";
import UserInfo from "../../utils/UserInfo";

const login0Handler = async (
  email: string | undefined,
  name: string | undefined
) => {
  const user = await User.findOne({ where: { email } });
  if (user) {
    const isBanned = user.dataValues.isDisabled
    if(isBanned) throw new Error ("User is banned.")

    const { name, logo, about, firstname, lastname, country, city, zipcode } =
      user.dataValues;
    const userInfo: UserInfo = {
      email,
      name,
      logo,
      about,
      firstname,
      lastname,
      country,
      city,
      zipcode
    };

    const secretKey = config.secretKey;
    const token = jwt.sign(userInfo, secretKey, { expiresIn: "36h" });
    return token;
  }

  const SALT_ROUNDS: number = 10;

  const password = await bcrypt.hash("auth0user", SALT_ROUNDS);

  await User.create({
    email,
    password,
    name,
  });

  const newUser = { email, name };

  const secretKey = config.secretKey;
  const token = jwt.sign(newUser, secretKey, { expiresIn: "36h" });
  return token;
};

export default login0Handler;
