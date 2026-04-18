import jwt from "jsonwebtoken";

// Protects routes — checks for a valid JWT token in the Authorization header
// Usage: add `protect` as middleware to any route that requires login
// Header format: Authorization: Bearer <token>

export const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Header must exist and start with "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized. No token provided." });
    }

    // Extract the token part after "Bearer "
    const token = authHeader.split(" ")[1];

    // Verify the token — throws if invalid or expired
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user id to request so controllers can use it
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Token is invalid or expired." });
  }
};
