import express from "express";
import { createLink, getLinks, getAllLinks, updateLink, deleteLink, trackClick } from "../controllers/link.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createLink);                   // Create a link — must be logged in
router.get("/all/:profileId", protect, getAllLinks);     // Dashboard links — must be logged in
router.get("/:profileId", getLinks);                    // Public active links — no auth needed
router.patch("/:id", protect, updateLink);              // Update a link — must be logged in
router.delete("/:id", protect, deleteLink);             // Delete a link — must be logged in
router.patch("/:id/click", trackClick);                 // Track click — no auth (public visitors)

export default router;
