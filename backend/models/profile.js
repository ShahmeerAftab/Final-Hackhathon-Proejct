import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  fullName: { type: String, required: true },
  bio: String,
  profileImage: String,
  coverImage: String,
  template: { type: Number, default: 1 },
  theme: { type: String, enum: ["light", "dark"], default: "light" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Profile", profileSchema);