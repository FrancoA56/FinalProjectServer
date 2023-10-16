import config from '../../utils/config'
import { User } from "../../db";
import jwt from "jsonwebtoken";

const forgotPasswordHandler = async (email: string | undefined) => {
  
    if(!email) throw new Error ("Email is required")
  const user = await User.findOne({ where: { email } });

  if (!user) throw new Error("User doesn't exist.");

  const secretKey = config.secretKey
  const token = jwt.sign({ email: email},secretKey, {expiresIn: '1h'});

  return ;
};

export default forgotPasswordHandler;