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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countConsecutiveMoodEntryDays = countConsecutiveMoodEntryDays;
const mood_entry_1 = require("../models/mood.entry");
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
dayjs_1.default.extend(utc_1.default);
const WEEKEND_DAYS = [0, 6]; // Sunday=0, Saturday=6
function countConsecutiveMoodEntryDays(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Find the latest mood entry for the user
        const latestEntry = yield mood_entry_1.MoodEntry.findOne({ userId })
            .sort({ createdAt: -1 })
            .lean();
        if (!latestEntry) {
            console.log("No mood entries found for user:", userId);
            return 0;
        }
        let streakCount = 0;
        let currentDate = (0, dayjs_1.default)(latestEntry.createdAt).utc().startOf("day");
        while (true) {
            // Skip weekends — if you want to count weekends, remove this block
            if (WEEKEND_DAYS.includes(currentDate.day())) {
                currentDate = currentDate.subtract(1, "day");
                continue;
            }
            const start = currentDate.startOf("day").toDate();
            const end = currentDate.endOf("day").toDate();
            // Count mood entries on currentDate
            const count = yield mood_entry_1.MoodEntry.countDocuments({
                userId,
                createdAt: { $gte: start, $lte: end },
            });
            console.log(`Checking date ${currentDate.format("YYYY-MM-DD")} - entries found: ${count}`);
            if (count === 0)
                break; // Streak broken
            streakCount++;
            currentDate = currentDate.subtract(1, "day");
        }
        console.log(`Final streak count for user ${userId}: ${streakCount}`);
        return streakCount;
    });
}
