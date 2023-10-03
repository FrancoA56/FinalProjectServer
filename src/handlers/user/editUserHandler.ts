import { User } from "../../db";
import bcrypt from "bcrypt";

const editUserHandler = async (
  email: string | undefined,
  password: string | undefined,
  name: string | undefined,
  logo: string | undefined
) => {
  let hashedPass;
  if (password) {
    const SALT_ROUNDS: number = 10;
    hashedPass = await bcrypt.hash(password, SALT_ROUNDS);
  }

  await User.update(
    {
      password: hashedPass,
      name: name,
      logo: logo,
    },
    { where: { email } }
  );

  const user = await User.findOne({ where: { email } });

  return {
    email,
    name: user.dataValues.name,
    logo: user.dataValues.logo,
  };
};

export default editUserHandler;
