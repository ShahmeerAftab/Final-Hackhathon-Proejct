import jwt from "jsonwebtoken";
import User from "../models/user.js";

/**
 * protect — JWT Authentication Middleware
 *
 * What it does:
 *   1. Reads the Bearer token from the Authorization header
 *   2. Verifies the token signature and expiry
 *   3. Fetches the FULL user from the database (not just the token payload)
 *   4. Attaches the user object to req.user for downstream controllers
 *
 * Why fetch from DB instead of just trusting the token payload?
 *   - If a user is deleted or banned, their old token would still work
 *     if we only verified the signature. A DB lookup catches this.
 *   - req.user will have fresh data (username, email) — not stale token data.
 *
 * Usage:
 *   router.get("/me", protect, getMe);
 *
 * Request format:
 *   Authorization: Bearer <your_jwt_token>
 */
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Step 1 — Check header exists and has the right format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Not authorized. No token provided." });
    }

    // Step 2 — Extract the token string (everything after "Bearer ")
    const token = authHeader.split(" ")[1];

    // Step 3 — Verify signature + expiry. Throws on failure.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Step 4 — Fetch fresh user from DB using the id stored in the token
    // We do NOT include the password field here
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      // Token was valid but the user account no longer exists
      return res.status(401).json({ message: "User account no longer exists." });
    }

    // Step 5 — Attach full user to the request
    req.user = user;

    next();
  } catch (error) {
    // Tell the client WHY their token failed — helps with frontend handling
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Session expired. Please log in again." });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token. Please log in again." });
    }
    // Any other unexpected error
    return res.status(401).json({ message: "Authentication failed." });
  }
};
