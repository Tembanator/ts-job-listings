import connectDB from "@/lib/mongodb";
import User from "../../models/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export const findMyCurrentUser = async () => {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return JSON.parse(JSON.stringify({}));
    }

    await connectDB();

    const user = await User.findOne({ clerkUserId: clerkUser.id });

    if (!user) {
      return JSON.parse(JSON.stringify({}));
    }
    return JSON.parse(JSON.stringify(user));
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      console.error(`Error finding current user: ${err.message}`);
      return JSON.parse(JSON.stringify({}));
    }
    if (err instanceof mongoose.Error.CastError) {
      console.error(`Error finding current user: ${err.message}`);
      return JSON.parse(JSON.stringify({}));
    }
    if (err instanceof mongoose.Error) {
      console.error(`Error finding current user: ${err.message}`);
      return JSON.parse(JSON.stringify({}));
    }
  }
};

export const createUser = async (data: User) => {
  try {
    await connectDB();
    const newUser = new User(data);
    const savedUser = await newUser.save();
    return NextResponse.json({ success: true, status: 201, data: savedUser });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      console.error(`Error creating user: ${err.message}`);
      // Return a 400 status for bad input
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Failed to create user. Please check the input data.",
      });
    }
  }
};

export const findUserById = async (userId: string) => {
  try {
    await connectDB();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({
        success: false,
        status: 404,
        message: "User not found.",
      });
    }
    return NextResponse.json({ success: true, status: 200, data: user });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      console.error(`Error finding user by ID: ${err.message}`);
      // Return 400 status if the ID format is invalid
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Failed to find user. Invalid ID format or server error.",
      });
    }
  }
};

export const findUserByClerkId = async (clerkUserId: string) => {
  try {
    await connectDB();
    const user = await User.findOne({ clerkUserId });
    if (!user) {
      return JSON.parse(JSON.stringify({}));
    }
    return JSON.parse(JSON.stringify(user));
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      console.error(`Error finding user by clerk ID: ${err.message}`);
      return JSON.parse(JSON.stringify({}));
    }
    return JSON.parse(JSON.stringify({}));
  }
};

export const getAllUsers = async () => {
  try {
    await connectDB();
    const users = await User.find({});
    return NextResponse.json({ success: true, status: 200, data: users });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      console.error(`Error retrieving all users: ${err.message}`);
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Failed to retrieve users. Invalid request.",
      });
    }
    return NextResponse.json({
      success: false,
      status: 500,
      message: "Failed to retrieve users. Server error.",
    });
  }
};

export const updateUserByClerkId = async (
  clerkUserId: string,
  updateData: Partial<User>
) => {
  try {
    await connectDB();
    const updatedUser = await User.findOneAndUpdate(
      { clerkUserId },
      updateData,
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return NextResponse.json({
        success: false,
        status: 404,
        message: "User not found.",
      });
    }
    return NextResponse.json({ success: true, status: 200, data: updatedUser });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      console.error(`Error updating user: ${err.message}`);
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Failed to update user. Please check the ID and input data.",
      });
    }
  }
};

export const deleteUserById = async (userId: string) => {
  try {
    await connectDB();
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return NextResponse.json({
        success: false,
        status: 404,
        message: "User not found.",
      });
    }
    return NextResponse.json({ success: true, status: 200, data: deletedUser });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      console.error(`Error deleting user: ${err.message}`);
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Failed to delete user. Invalid ID format or server error.",
      });
    }
  }
};
