import { User } from "../../db";

const getUserHandler = async (email: string | undefined) => {
  const user = await User.findOne({ where: { email } });

  if (!user) throw new Error("User doesn't exist.");

  const { name, logo, about, firstname, lastname, country, city, zipcode } = user.dataValues;

  return { email, name, logo, about, firstname, lastname, country, city, zipcode };
};

export default getUserHandler;
