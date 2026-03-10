import express from "express";
import userRoutes from "../modules/user/user.routes.js";
import candidateRoutes from "../modules/candidate/candidate.routes.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/candidates", candidateRoutes);

export default router;
