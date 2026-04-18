import Profile from "../models/profile.js";

// Create a new profile
export const createProfile = async (req, res) => {
  try {
    const profile = await Profile.create(req.body);
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a profile by username — used by the public profile page
export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ username: req.params.username });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Upload a profile image — returns the public URL
export const uploadImage = async (req, res) => {
  try {
    console.log("[upload] req.file:", req.file);
    if (!req.file) return res.status(400).json({ message: "No file uploaded." });
    const url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.json({ url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a profile (fullName, bio, profileImage, coverImage)
export const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
