import { User } from "../../db";
const bcrypt = require("bcrypt");

const editUserHandler = async (
  email: string | undefined,
  password: string | undefined,
  name: string | undefined,
  logo: string | undefined
) => {
  const user = await User.findOne({ where: { email } });
  const SALT_ROUNDS: number = 10;

  if (!user) throw new Error("User doesn't exist.");

  if (password) {
    const hashedPass = await bcrypt.hash(password, SALT_ROUNDS);

    user.dataValues.password = hashedPass;
  }

  if (name) user.dataValues.name = name;
  if (logo) user.dataValues.logo = logo;

  await user.save();
  return user;
};

export default editUserHandler;
