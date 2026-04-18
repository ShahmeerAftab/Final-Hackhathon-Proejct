import express from "express";
import { signup, login, getMe, logout, register } from "../controllers/auth.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ── Public routes (no token needed) ──────────────────────────────────────
router.post("/signup",   signup);   // POST /api/auth/signup
router.post("/login",    login);    // POST /api/auth/login

// Backward-compat: old /register still works
router.post("/register", register); // POST /api/auth/register

// ── Protected routes (valid JWT required) ────────────────────────────────
router.get( "/me",     protect, getMe);   // GET  /api/auth/me
router.post("/logout", protect, logout);  // POST /api/auth/logout

export default router;
