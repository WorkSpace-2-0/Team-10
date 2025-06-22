import mongoose, { mongo } from "mongoose";

const moodEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  teamId: {
    type: mongoose.Types.ObjectId,
    ref: "team",
    required: false,
  },
  moodType: {
    type: String,
    enum: ["ecstatic", "happy", "neutral", "sad", "angry"],
    required: true,
  },
  moodScore: {
    type: Number,
    required: true,
  },
  note: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const moodEntry = mongoose.model("MoodEntry", moodEntrySchema);
export default moodEntry;
