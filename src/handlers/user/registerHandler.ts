const { User } = require('../../db');

const registerHandler = async (
  email: string | undefined,
  password: string | undefined,
  name: string | undefined,
  logo: string | undefined
) => {
  if (!email || !password || !name) {
    throw new Error('Faltan datos');
  }
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('El usuario ya existe');
  }
  const newUser = await User.create({
    email,
    password,
    name,
    logo,
  });
  return newUser;
};

