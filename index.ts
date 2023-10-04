import { sequelize } from "./src/db";
import server from "./src/server";
import 'reflect-metadata';

const PORT: number = 3001;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synced correctly");
    server.listen(PORT, () => console.log("Server listening on port " + PORT));
  })
  .catch((error:Error) => {
    console.error(error);
  });
