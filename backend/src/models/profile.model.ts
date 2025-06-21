import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  goingOut: {
    type: String,
    require: true,
  },
  weekend: {
    type: String,
    require: true,
  },
  hobby: {
    type: String,
    require: true,
  },
});

export const profile = mongoose.model("profile", profileSchema);
