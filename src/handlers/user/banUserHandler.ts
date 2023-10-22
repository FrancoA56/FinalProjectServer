import { User } from "../../db";

const banUserHandler = async (email: string | undefined) => {
  
  const user = await User.findOne({ where: { email } });

  if (!user) throw new Error("User doesn't exist.");
  if (user.dataValues.isDisabled) throw new Error("User is already banned");

  await User.update(
    {
      isDisabled:true
    },
    { where: { email } }
  );

    const {id,name,logo} = user.dataValues;
  return {
    id,
    email,
    name,
    logo,
    isDisabled: true,
  };
};

export default banUserHandler;
