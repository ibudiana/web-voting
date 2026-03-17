import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware.js";
import apiRoutes from "./routes/api.js";

const app = express();

// Middleware
const allowedOrigins = [
  "http://localhost:5173", // URL untuk development lokal
  "https://web-voting-1.onrender.com", // URL untuk frontend yang di-deploy di Render
];

app.use(
  cors({
    origin: allowedOrigins,
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
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
