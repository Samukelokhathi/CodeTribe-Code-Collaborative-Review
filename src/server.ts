import bodyParser from "body-parser";
import "dotenv/config";
import express from "express";
import { testDbConnection } from "./config/database";
import projectRoutes from "./routes/routes";

const app = express();

const PORT = parseInt(process.env.PORT || "5432");

const startServer = async () => {
  await testDbConnection();

  app.use(express.json());
  app.use("/api", routes);
  app.use("/api", projectRoutes);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
