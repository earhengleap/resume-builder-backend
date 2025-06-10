import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/auth-controller.js";
import protect from "../middlewares/auth-middleware.js";
import upload from "../middlewares/upload-middleware.js";

const router = express.Router();

//Auth Routes

router.post("/register", registerUser); //Register User
router.post("/login", loginUser); //Login User
router.get("/profile", protect, getUserProfile); //Get User Profile

router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded",
    });
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;

  res.status(200).json({
    imageUrl,
  });
});

export default router;
