import "dotenv/config";
import express from "express";
import { testDbConnection } from "./config/database";
import userRouter from "./routes/userRouter";

const app = express();
const PORT = parseInt(process.env.PORT || "3000");

app.use(express.json());

app.use("/api", userRouter);

const startServer = async () => {
  await testDbConnection();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
