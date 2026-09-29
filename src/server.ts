import bodyParser from "body-parser";
import "dotenv/config";
import express from "express";
import { testDbConnection } from "./config/database";

const app = express();
app.use(express.json());
app.use(bodyParser.json());

const PORT = parseInt(process.env.PORT || "5432");

console.log("Testing connection...........");
testDbConnection();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
