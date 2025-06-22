import mongoose from "mongoose";

const rewardSchema = new mongoose.Schema({
  rewardTitle: {
    type: String,
    required: true,
  },
});

export const reward = mongoose.model("reward", rewardSchema);
