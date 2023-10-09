// import jwt, { JwtPayload } from "jsonwebtoken";
// import config from "../utils/config";

// function validateToken(token: string | undefined): JwtPayload | null {
//     try {
//       const decodedToken = jwt.verify(token, config.secretKey) as JwtPayload;
//       const currentTime = Date.now() / 1000;

//       return (decodedToken.exp && decodedToken.exp > currentTime) 

//     } catch (error) {
//         throw new Error ((error as Error).message)
//     }
  
// }

// export default validateToken;
