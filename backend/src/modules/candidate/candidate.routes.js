import express from "express";
import candidateController from "./candidate.controller.js";

const router = express.Router();

router.get("/", candidateController.getAll);
router.get("/:id", candidateController.getById);
router.post("/", candidateController.create);
router.put("/:id", candidateController.update);
router.delete("/:id", candidateController.delete);
router.post("/:id/vote", candidateController.vote);

export default router;
