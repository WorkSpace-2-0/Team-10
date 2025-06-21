import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    profile: {
      type: mongoose.Types.ObjectId,
      ref: "profile",
    },

    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
export const User = mongoose.model("user", userSchema);
