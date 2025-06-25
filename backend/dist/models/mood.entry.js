"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoodEntry = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const moodEntrySchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Types.ObjectId,
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
exports.MoodEntry = mongoose_1.default.model("MoodEntry", moodEntrySchema);
