import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  goingOut: {
    type: [String], 
    required: true,
  },
  weekend: {
    type: [String], 
    required: true,
  },
  hobby: {
    type: [String], 
    required: true,
  },
});

export const profile = mongoose.model("profile", profileSchema);
