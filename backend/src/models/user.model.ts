import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
  teamId: {
    type: mongoose.Types.ObjectId,
    ref: "team",
  },

  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model("user", userSchema);
