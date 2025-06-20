import mongoose, { mongo } from "mongoose";

const moodEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  teamId: {
    type: mongoose.Types.ObjectId,
    ref: "team",
  },
  moodScore: {
    type: Number,
    note: String,
    createdAt: { type: Date, default: Date.now },
  },
});
