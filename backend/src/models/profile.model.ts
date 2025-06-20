import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
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
