import "dotenv/config";
import express from "express";
import { testDbConnection } from "./config/database";
import applicationRoutes from "./routes/applicationRoutes";
import userRouter from "./routes/userRouter";

const app = express();

const PORT = parseInt(process.env.PORT || "3000");

const startServer = async () => {
  await testDbConnection();

  app.use(express.json());
  app.use("/api", applicationRoutes);
  app.use("/api", userRouter);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
