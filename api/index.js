import express from "express";
import { config } from "dotenv";
import authRoutes from "./routes/auth.routes.js";
config();
const app = express();

// api routes
app.use(express.json());
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
