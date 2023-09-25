import { sequelize } from "./src/db";
import server from "./src/server";
const PORT: number = 3001;

sequelize
  .sync({ force: true, logging: false })
  .then(() => {
    console.log("Database synced correctly");
    server.listen(PORT, () => console.log("Server listening on port " + PORT));
  })
  .catch((error) => {
    console.error(error);
  });
