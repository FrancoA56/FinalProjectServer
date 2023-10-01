const { User } = require("../../db");
const bcrypt = require("bcrypt");

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

  return await User.findOne({ where: { email } });
};

export default editUserHandler;
