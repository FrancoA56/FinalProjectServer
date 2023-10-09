// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import config from "../utils/config";
// import va

// const tokenAuth = (req: Request, res: Response, next: NextFunction) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) throw new Error("There isn't token");

//   try {
//     const decodedToken = jwt.verify(token, config.secretKey);
//     next();
//   } catch (error) {}
// };

// export default tokenAuth;
