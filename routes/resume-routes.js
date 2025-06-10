import express from "express";

import protect from "../middlewares/auth-middleware.js";
// import { uploadResumeImages } from "../controllers/upload-images.js";

import {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
} from "../controllers/resume-controller.js";

const router = express.Router();

router.post("/", protect, createResume); //Create Resume
router.get("/", protect, getUserResumes); //Get Resume
router.get("/:id", protect, getResumeById); //Get Resume By ID
router.put("/:id", protect, updateResume); //Update Resume
// router.put("/", protect, deleteResume); //Delete Resume

router.delete("/:id", protect, deleteResume); //Delete Resume

export default router;
