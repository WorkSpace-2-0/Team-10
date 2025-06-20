import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDb = async () => {
  const url = process.env.MONGO_CONNECTION_STRING;

  if (!url) {
    throw new Error(
      "Missing MONGO_CONNECTION_STRING in environment variables."
    );
  }
  try {
    await mongoose.connect(url);
    console.log("connected");
  } catch (error) {
    console.log("error", error);
  }
};
