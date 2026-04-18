import express from "express";
import multer from "multer";
import { createProfile, getProfile, updateProfile, uploadImage } from "../controllers/profile.controller.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middlewear/upload.js";

const router = express.Router();

router.post("/", protect, createProfile);          // Create profile
router.get("/:username", getProfile);              // Get public profile
router.patch("/:id", protect, updateProfile);      // Update profile

// Upload — multer error handler ensures JSON is always returned
router.post(
  "/upload",
  protect,
  (req, res, next) => {
    upload.single("file")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: `Upload error: ${err.message}` });
      }
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  },
  uploadImage
);

export default router;
