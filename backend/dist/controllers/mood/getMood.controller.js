"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserMoods = exports.getAllMoods = void 0;
const mood_entry_1 = require("../../models/mood.entry");
// Get all moods
const getAllMoods = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const moods = yield mood_entry_1.MoodEntry.find().sort({ createdAt: -1 });
        const formattedMoods = moods.map((mood) => ({
            _id: mood._id.toString(),
            userId: mood.userId.toString(),
            moodScore: mood.moodScore,
            moodTitle: mood.moodTitle,
            note: mood.note,
            createdAt: mood.createdAt.toISOString(),
        }));
        res.json(formattedMoods);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});
exports.getAllMoods = getAllMoods;
// Get moods for a specific user
const getUserMoods = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!userId)
            return res.status(400).json({ error: "UserId is required" });
        const moods = yield mood_entry_1.MoodEntry.find({ userId }).sort({ createdAt: -1 });
        const formattedMoods = moods.map((mood) => ({
            _id: mood._id.toString(),
            userId: mood.userId.toString(),
            moodScore: mood.moodScore,
            moodTitle: mood.moodTitle,
            note: mood.note,
            createdAt: mood.createdAt.toISOString(), // <-- ISO string here
        }));
        res.json(formattedMoods);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});
exports.getUserMoods = getUserMoods;
