import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import authRoutes    from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import linkRoutes    from "./routes/link.routes.js";
import contactRoutes from "./routes/contact.routes.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// ── CORS ──────────────────────────────────────────────────────────────────
// FIX: restrict origins instead of accepting all (*).
// ALLOWED_ORIGINS in .env is a comma-separated list, e.g. "http://localhost:3000"
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  : ["http://localhost:3000"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // required if you ever switch to cookie-based auth
  })
);

// ── Body Parsers ──────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // needed for form submissions

// ── Static Files ──────────────────────────────────────────────────────────
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ── Routes ────────────────────────────────────────────────────────────────
app.use("/api/auth",    authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/link",    linkRoutes);
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Helplytics API is running." });
});

// ── 404 Handler ───────────────────────────────────────────────────────────
// Catches any request that didn't match a route above
app.use((req, res) => {
  res.status(404).json({ message: `Route '${req.originalUrl}' not found.` });
});

// ── Global Error Handler ──────────────────────────────────────────────────
// FIX: must have FOUR parameters (err, req, res, next) — Express identifies
// this as an error-handling middleware by the arity.
// All controllers call next(error) to reach here.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.stack || err.message}`);

  // Mongoose duplicate key (e.g. unique email/username constraint)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({ message: `${field} is already in use.` });
  }

  // Mongoose validation errors (schema-level)
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: messages.join(", ") });
  }

  // Any other error — hide details in production
  const statusCode = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === "production"
      ? "Something went wrong. Please try again."
      : err.message;

  res.status(statusCode).json({ message });
});

// ── Start Server ──────────────────────────────────────────────────────────
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} [${process.env.NODE_ENV || "development"}]`);
});
