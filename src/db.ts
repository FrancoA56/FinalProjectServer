import { Sequelize } from "sequelize-typescript";
import config from "./utils/config";

let sequelize: Sequelize;
if (config.dev) {//LOCAL CONNECTION
    sequelize = new Sequelize({
    dialect: "postgres",
    database: config.dbName,
    password: config.dbPassword,
    username: config.dbUser,
    storage: ":memory:",
    models: [__dirname + "/models"],
    logging: false,
  });
} else {//RENDER CONNECTION
    sequelize = new Sequelize(config.dbDeploy, {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
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
  Review,
  UserPreset,
} = sequelize.models;

export {
  sequelize,
  User,
  Admin,
  Preset,
  Invoice,
  InvoiceItem,
  Review,
  UserPreset,
};
