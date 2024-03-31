import express, { Express } from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import foods from "@app/foods";
import table from "@app/table";
import Socket from "@app/socket";
import cors from "cors";

dotenv.config();

const app: Express = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors({ origin: "*" }));

app.use(express.json());

app.use("/foods", foods);

app.use("/table", table);

io.on("connection", Socket);

server.listen(process.env.PORT || 3000, () => {
  console.log(
    `[server]:Server is running at http://localhost:${process.env.PORT || 3000}`
  );
});
