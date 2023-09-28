import { User } from "../../db";

const getUserHandler = (email: string | undefined) => {
  const user = User.findOne({ where: { email } });

  if (!user) throw new Error("User doesn't exist.");
  return user;
};

export default getUserHandler;
