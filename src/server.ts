import bodyParser from "body-parser";
import "dotenv/config";
import express from "express";

const app = express();
app.use(express.json());
app.use(bodyParser.json());


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});