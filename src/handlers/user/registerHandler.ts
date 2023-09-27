const { User } = require('../../db');
const bcrypt = require ('bcrypt')

const registerHandler = async (
  email: string | undefined,
  password: string | undefined,
  name: string | undefined,
  logo: string | undefined
) => {
  if (!email || !password || !name) {
    throw new Error('Missing data.');
  }
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('User already exists.');
  }
  const SALT_ROUNDS:number = 10;

  const hashedPass = await bcrypt.hash(password,SALT_ROUNDS)
  
  password = hashedPass;
  
  const newUser = await User.create({
    email,
    password,
    name,
    logo,
  });
  return newUser;
};


export default registerHandler;
