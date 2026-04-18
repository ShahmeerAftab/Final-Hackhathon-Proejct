import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { family: 4 });
    console.log("MongoDB connected successfully.");
  } catch (error) {
    // FIX: log the actual error message properly and STOP the process.
    // Old code: silently swallowed the error — server started even with no DB.
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit with failure code so the process manager can restart
  }
};

export default connectDB;
