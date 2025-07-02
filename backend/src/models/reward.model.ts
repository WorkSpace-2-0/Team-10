import mongoose from "mongoose";

const rewardSchema = new mongoose.Schema({
  rewardTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  expireDay: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

export const reward = mongoose.model("reward", rewardSchema);
