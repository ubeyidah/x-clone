import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import connectMongoDb from "./db/connectMongoDB.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import handleError from "./middlewares/errorHandle.js";
config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// api routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// error handling middleware
app.use(handleError);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  connectMongoDb();
  console.log(`listening on http://localhost:${port}`);
});
