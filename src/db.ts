import { Sequelize } from "sequelize-typescript";
import config from "./utils/config";

let sequelize: Sequelize;
if (config.dev) {
    sequelize = new Sequelize({
    dialect: "postgres",
    database: config.dbName,
    password: config.dbPassword,
    username: config.dbUser,
    storage: ":memory:",
    models: [__dirname + "/models"],
    logging: false,
  });
} else {
    sequelize = new Sequelize(config.dbDeploy, {
    logging: false,
    native: false, 
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
    models: [__dirname + "/models"],
  });
}

const {
  User,
  Admin,
  Preset,
  Invoice,
  InvoiceItem,
  Order,
  OrderItem,
  Review,
} = sequelize.models;

export {
  sequelize,
  User,
  Admin,
  Preset,
  Invoice,
  InvoiceItem,
  Order,
  OrderItem,
  Review,
};
