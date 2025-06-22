import mongoose from "mongoose";

const moodEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  moodScore: {
    type: Number,
    required: true,
  },
  note: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
});

export const moodEntry = mongoose.model("moodEntry", moodEntrySchema);
