import { User } from "../../db";

const getUserHandler = async (email: string | undefined) => {
  const user = await User.findOne({ where: { email } });

  if (!user) throw new Error("User doesn't exist.");

  return {
    email,
    name: user.dataValues.name,
    logo: user.dataValues.logo,
  };
};

export default getUserHandler;
