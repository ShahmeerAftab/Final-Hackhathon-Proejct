import Link from "../models/link.js";

// Create a new link
export const createLink = async (req, res) => {
  try {
    const link = await Link.create(req.body);
    res.status(201).json(link);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get only ACTIVE links — used by the public profile page
export const getLinks = async (req, res) => {
  try {
    const links = await Link.find({ profileId: req.params.profileId, isActive: true });
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get ALL links (active + inactive) — used by the dashboard
export const getAllLinks = async (req, res) => {
  try {
    const links = await Link.find({ profileId: req.params.profileId });
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a link (title, url, or isActive)
export const updateLink = async (req, res) => {
  try {
    const link = await Link.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!link) {
      return res.status(404).json({ message: "Link not found." });
    }
    res.json(link);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a link
export const deleteLink = async (req, res) => {
  try {
    const link = await Link.findByIdAndDelete(req.params.id);
    if (!link) {
      return res.status(404).json({ message: "Link not found." });
    }
    res.json({ message: "Link deleted." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Increment click count when a public user clicks a link
export const trackClick = async (req, res) => {
  try {
    const link = await Link.findByIdAndUpdate(
      req.params.id,
      { $inc: { clicks: 1 } },
      { new: true }
    );
    if (!link) {
      return res.status(404).json({ message: "Link not found." });
    }
    res.json(link);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
