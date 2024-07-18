import express from "express";
import { config } from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectMongoDb from "./db/connectMongoDB.js";
import handleError from "./middlewares/errorHandle.js";
config();
const app = express();

// api routes
app.use(express.json());
app.use("/api/auth", authRoutes);

// error handling middleware
app.use(handleError);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  connectMongoDb();
  console.log(`listening on http://localhost:${port}`);
});
