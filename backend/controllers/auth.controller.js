import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Profile from "../models/profile.js";

// ─── Helper ────────────────────────────────────────────────────────────────

/**
 * Creates a signed JWT access token.
 * Expiry is read from .env so it can be changed without touching code.
 */
const createToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};

// ── POST /api/auth/signup ───────────────────────────────────────────────────

export const signup = async (req, res, next) => {
  try {
    const { fullName, username, email, password, template } = req.body;

    // ── 1. Required fields ──
    if (!fullName || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // ── 2. Full name length ──
    if (fullName.trim().length < 2) {
      return res.status(400).json({ message: "Full name must be at least 2 characters." });
    }

    // ── 3. Username format: 3–20 chars, letters / numbers / underscores ──
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({
        message: "Username must be 3–20 characters (letters, numbers, underscores only).",
      });
    }

    // ── 4. Email format ──
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email address." });
    }

    // ── 5. Password length ──
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters." });
    }

    // FIX: always normalize email + username before DB operations
    // This prevents "User@X.COM" and "user@x.com" being treated as different accounts
    const normalizedEmail    = email.toLowerCase().trim();
    const normalizedUsername = username.toLowerCase().trim();

    // ── 6. Duplicate check ──
    const existing = await User.findOne({
      $or: [{ email: normalizedEmail }, { username: normalizedUsername }],
    });
    if (existing) {
      // FIX: 409 Conflict is the correct status for "already exists" — not 400
      return res.status(409).json({ message: "Email or username already in use." });
    }

    // ── 7. Hash password ──
    // FIX: use 12 rounds — 10 is the old default; 12 is the current recommended minimum
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      username: normalizedUsername,
      email: normalizedEmail,
      password: hashedPassword,
    });

    await Profile.create({
      username: normalizedUsername,
      fullName: fullName.trim(),
      template: template || 1,
    });

    const token = createToken(user._id);

    // FIX: include user.id in the response — frontend needs it for API calls
    return res.status(201).json({
      token,
      user: {
        id:       user._id,
        username: user.username,
        email:    user.email,
      },
    });
  } catch (error) {
    // FIX: pass to global error handler instead of handling inline
    // The global handler in server.js catches Mongoose duplicate key errors cleanly
    next(error);
  }
};

// ── POST /api/auth/login ────────────────────────────────────────────────────

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // ── Required fields ──
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email address." });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // FIX: must use .select("+password") because password has select:false in the model
    const user = await User.findOne({ email: normalizedEmail }).select("+password");

    // FIX: USER ENUMERATION — old code returned different messages:
    //   "No account found with that email." → attacker knows email doesn't exist
    //   "Incorrect password."               → attacker knows email DOES exist
    // Fix: always return the SAME generic message for both cases
    const INVALID_CREDENTIALS = "Invalid email or password.";

    if (!user) {
      return res.status(401).json({ message: INVALID_CREDENTIALS });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: INVALID_CREDENTIALS });
    }

    const token = createToken(user._id);

    // FIX: include user.id
    return res.status(200).json({
      token,
      user: {
        id:       user._id,
        username: user.username,
        email:    user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ── GET /api/auth/me (protected) ────────────────────────────────────────────

/**
 * Returns the currently logged-in user's profile.
 * The `protect` middleware already fetched the user from DB and attached
 * it to req.user, so this controller just returns it.
 */
export const getMe = async (req, res) => {
  // req.user is set by the protect middleware — it's a full Mongoose user object
  // password is already excluded via select:false in the model
  res.status(200).json({
    user: {
      id:        req.user._id,
      username:  req.user.username,
      email:     req.user.email,
      createdAt: req.user.createdAt,
    },
  });
};

// ── POST /api/auth/logout ───────────────────────────────────────────────────

/**
 * Logout endpoint.
 *
 * For Bearer-token auth (our current approach):
 *   The server is stateless — it cannot "delete" a token.
 *   The client is responsible for discarding the token from storage.
 *   This endpoint signals a successful logout and returns 200.
 *
 * For HTTP-only cookie auth:
 *   Uncomment `res.clearCookie("token")` to also clear the server-set cookie.
 */
export const logout = (req, res) => {
  // If you switch to HTTP-only cookies later, uncomment this:
  // res.clearCookie("token", { httpOnly: true, sameSite: "strict", secure: true });

  res.status(200).json({ message: "Logged out successfully." });
};

// Backward-compat alias — old routes used /register, new spec uses /signup
export const register = signup;
