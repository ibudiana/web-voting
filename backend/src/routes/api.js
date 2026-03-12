import express from "express";
import userRoutes from "../modules/user/user.routes.js";
import candidateRoutes from "../modules/candidate/candidate.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/candidates", candidateRoutes);

export default router;
