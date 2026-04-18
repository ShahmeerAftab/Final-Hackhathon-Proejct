import express from "express";
import { createContactUs } from "../controllers/contact.controller.js";

const router = express.Router();

// Contact
router.post("/", createContactUs);

export default router;