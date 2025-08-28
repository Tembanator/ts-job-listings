import mongoose, { Schema } from "mongoose";

// Define the User schema
const userSchema = new mongoose.Schema({
  // The user's email address. It's required, unique, and stored in lowercase for consistency.
  email: {
    type: String,
    required: [true, 'Email is required.'], // The error message if the field is missing
    unique: true, // Ensures no two users can have the same email
    lowercase: true,
    trim: true, // Removes whitespace from both ends of a string
    match: [/.+@.+\..+/, 'Please enter a valid email address.'] // Basic email format validation
  },
  // The user's name. Required.
  name: {
    type: String,
    required: [true, 'Name is required.'],
    trim: true,
  },
  // A boolean to indicate if the user is a company account. Defaults to false.
  isCompany: {
    type: Boolean,
    default: false,
  },
  // A boolean to indicate if the user has administrative privileges. Defaults to false.
  isAdmin: {
    type: Boolean,
    default: false,
  },
  // The unique user ID provided by Clerk. This is a crucial field for connecting the Mongoose record to the Clerk user.
  clerkUserId: {
    type: String,
    required: [true, 'Clerk user ID is required.'],
    unique: true,
  },
}, {
  // Mongoose will automatically manage `createdAt` and `updatedAt` timestamps for you.
  timestamps: true,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);


export default User;