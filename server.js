import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth-routes.js";
import resumeRoutes from "./routes/resume-routes.js";

import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

const app = express();

//Recrate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Middleware to handle CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//Connect to the database
connectDB();

//Middleware to parse JSON bodies

app.use(express.json());

//Middleware
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);``

//Serve uploads folder
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res, path) => {
      res.set("Access-Control-Allow-Origin", "http://localhost:5173");
    },
  })
);

//Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
