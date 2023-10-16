import { User } from "../../db";

const resetPasswordHandler = async (email: string | undefined, password: string | undefined) => {
  if (!email) throw new Error("Email is required");

  const user = await User.findOne({ where: { email } });

  if (!user) throw new Error("User doesn't exist.");

  return ;
};

export default resetPasswordHandler;