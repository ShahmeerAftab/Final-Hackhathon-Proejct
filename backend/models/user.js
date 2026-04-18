import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true, // always store as lowercase
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true, // always store as lowercase — prevents duplicate "User@X.com" vs "user@x.com"
    },
    password: {
      type: String,
      required: true,
      // FIX: select:false means the password hash is NEVER returned in queries
      // unless you explicitly do .select("+password")
      // This prevents accidental password hash leakage in API responses
      select: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
