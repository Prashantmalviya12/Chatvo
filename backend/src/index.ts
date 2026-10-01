import app from "./app.js";
import connectDB from "./db/db.js";
import {createServer} from "http"
import { initiallizeSocket } from "./utils/socket.js";
import dns from "dns"

dns.setServers(["1.1.1.1","8.8.8.8"])

const port = process.env.PORT || 8000;

const httpServer = createServer(app)

initiallizeSocket(httpServer)

connectDB().then(() => {
  httpServer.listen(port, () => {
    console.log("Server Connected with http://localhost:",port);
  });
});
