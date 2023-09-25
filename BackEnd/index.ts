import server from "./src/server";
const PORT: number = 3001;

server.listen(PORT, () => console.log("Server listening on port " + PORT));
