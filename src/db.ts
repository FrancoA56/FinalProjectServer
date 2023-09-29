import { Sequelize } from "sequelize-typescript";
import config from "./utils/config";
const sequelize = new Sequelize({
  dialect: "postgres",
  database: config.dbName,
  password: config.dbPassword,
  username: config.dbUser,
  storage: ":memory:",
  models: [__dirname + "/models"],
  logging: false,
});
const { User, Admin, Preset, UserPreset } = sequelize.models;
export { sequelize, User, Admin, Preset, UserPreset };
