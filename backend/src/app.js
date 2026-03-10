import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware.js";
import apiRoutes from "./routes/api.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Web Voting API is running" });
});

// API grouping
app.use("/api", apiRoutes);

// Error handling
app.use(errorHandler);

export default app;
