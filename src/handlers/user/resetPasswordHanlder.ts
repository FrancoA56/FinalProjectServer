import { User } from "../../db";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../utils/config";

const resetPasswordHandler = async (token: string, password: string) => {
  const secretKey = config.secretKey;

  const isValid = jwt.verify(token, secretKey) as JwtPayload;
  if (!isValid) throw new Error("Token invalid or expired");
  const { email } = isValid;

  
  if (!password) throw new Error("Password is required");
  let hashedPass;

  const SALT_ROUNDS: number = 10;
  hashedPass = await bcrypt.hash(password, SALT_ROUNDS);

  await User.update(
    {
      password: hashedPass,
    },
    { where: { email } }
  );
  // const user = await User.findOne({ where: { email } });

  return email;
};

export default resetPasswordHandler;
