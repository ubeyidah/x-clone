import express from "express";
import { config } from "dotenv";
config();
const app = express();

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
