import mongoose from "mongoose"; //edits

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.DATABASE_URL as string);
      console.log("MongoDB connected successfully!");
    }
  } catch (error) {
    // edits
    console.log("MongoDB connection error:", error);
  }
};

export default connectDB;