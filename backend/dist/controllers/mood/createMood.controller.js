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
exports.createMood = void 0;
const mood_entry_1 = require("../../models/mood.entry");
const checkAndRewardUser_1 = require("../../middlewares/checkAndRewardUser");
const rewardService_1 = require("../../services/rewardService");
const createMood = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const { moodScore, note, moodTitle } = req.body;
        if (!userId) {
            res.status(400).json({ error: "UserId is required" });
        }
        const newMood = new mood_entry_1.MoodEntry({
            userId,
            moodScore,
            note,
            moodTitle,
        });
        const saveMood = yield newMood.save();
        const reward = yield (0, checkAndRewardUser_1.checkStreakAndReward)(userId);
        if (reward) {
            yield (0, rewardService_1.saveUserReward)(userId, reward);
        }
        res.status(201).json({
            success: true,
            mood: saveMood,
            reward: reward !== null && reward !== void 0 ? reward : null, // << include even if null
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});
exports.createMood = createMood;
