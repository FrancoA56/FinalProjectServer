import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../utils/config";

function validateTokenHandler(token: string | undefined) {
  if (!token) throw new Error("There isn't token.");

  const decodedToken = jwt.verify(token, config.secretKey) as JwtPayload;
  const currentTime = Date.now() / 1000;

  return decodedToken.exp && decodedToken.exp > currentTime;
}

export default validateTokenHandler;
