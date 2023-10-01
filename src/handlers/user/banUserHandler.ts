import { User } from ("../../db");

const banUserHandler = async (email: string | undefined) => {
  const user = await User.findOne({ where: { email } });

  if (!user) throw new Error("User doesn't exist.");

  if (user.dataValues.isDisabled) throw new Error("User is already banned");

  user.dataValues.isDisabled = true;

  user.save();

  return user;
};

export default banUserHandler;
