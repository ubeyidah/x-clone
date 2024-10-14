import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import connectMongoDb from "./db/connectMongoDB.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import handleError from "./middlewares/errorHandle.js";
config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
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
