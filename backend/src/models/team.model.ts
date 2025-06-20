import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  teamName: { type: String, require: true },
  inviteCode: { type: String, require: true },
  adminUserId: { type: String, require: true },
  members: [{ type: mongoose.Types.ObjectId }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
export const team = mongoose.model("team", teamSchema);
