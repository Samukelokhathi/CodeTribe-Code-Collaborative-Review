import "dotenv/config";
import express from "express";
import { testDbConnection } from "./config/database";
import userRouter from "./routes/userRouter";
import router from "./routes/routes";
import projectRouter from "./routes/projectRoutes";

const app = express();
const PORT = parseInt(process.env.PORT || "3000");

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/auth", router);
app.use("/api/projects", projectRouter);

const startServer = async () => {
  await testDbConnection();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
