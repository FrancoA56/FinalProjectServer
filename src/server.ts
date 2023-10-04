import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";

import router from "./routes";

const server: Application = express();
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE'
    );
    next();
});

server.use(express.json({ limit: "50mb" }));
server.use(morgan("dev"));
server.use(cors());

server.use("/api", router);

export default server;
