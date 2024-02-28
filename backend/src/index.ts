import express, { Express } from "express";
import dotenv from "dotenv";

import foods from "./foods";

dotenv.config();

const app: Express = express();
app.use(express.json());

app.use("/foods", foods);

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `[server]:Server is running at http://localhost:${process.env.PORT || 3000}`
  );
});
