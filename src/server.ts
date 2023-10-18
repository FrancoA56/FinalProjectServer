import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";

import router from "./routes";

const server: Application = express();
server.use(express.json({ limit: "50mb" }));
server.use(morgan("dev"));
server.use(cors({ exposedHeaders: "X-Total-Count" }));

server.use("/api", router);

export default server;
