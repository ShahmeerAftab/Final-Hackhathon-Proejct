import ContactUs from "../models/contact.js";

// Create a new link
export const createContactUs = async (req, res) => {
  try {
    const contactUs = await ContactUs.create(req.body);
    res.status(201).json(contactUs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};