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
    moodTitle: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  export const MoodEntry = mongoose.model("MoodEntry", moodEntrySchema);

