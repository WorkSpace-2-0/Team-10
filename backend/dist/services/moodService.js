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
exports.calculateAverageMood = exports.fetchMoodEntries = void 0;
exports.startOfDay = startOfDay;
exports.endOfDay = endOfDay;
exports.checkLowMoodStreak = checkLowMoodStreak;
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const mood_entry_1 = require("../models/mood.entry");
dayjs_1.default.extend(utc_1.default);
function startOfDay(date) {
    return (0, dayjs_1.default)(date).utc().startOf("day").toDate();
}
function endOfDay(date) {
    return (0, dayjs_1.default)(date).utc().endOf("day").toDate();
}
const fetchMoodEntries = (userId, startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
    return yield mood_entry_1.MoodEntry.find({
        userId,
        createdAt: { $gte: startOfDay(startDate), $lte: endOfDay(endDate) },
    });
});
exports.fetchMoodEntries = fetchMoodEntries;
const calculateAverageMood = (userId, startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
    const start = startOfDay(startDate);
    const end = endOfDay(endDate);
    console.log(`[calculateAverageMood] User: ${userId}, Query DateRange: ${start.toISOString()} - ${end.toISOString()}`);
    const moods = yield (0, exports.fetchMoodEntries)(userId, start, end);
    if (moods.length === 0) {
        console.log(`[calculateAverageMood] User: ${userId}, No mood entries found in range.`);
        return 10; // default high mood if no data
    }
    const total = moods.reduce((sum, m) => { var _a; return sum + ((_a = m.moodScore) !== null && _a !== void 0 ? _a : 0); }, 0);
    const avg = total / moods.length;
    console.log(`[calculateAverageMood] User: ${userId}, Count: ${moods.length}, AvgMood: ${avg}`);
    return avg;
});
exports.calculateAverageMood = calculateAverageMood;
function checkLowMoodStreak(userId, days, threshold) {
    return __awaiter(this, void 0, void 0, function* () {
        const today = new Date();
        let streakCount = 0;
        for (let i = 0; i < days; i++) {
            const day = new Date(today);
            day.setDate(today.getDate() - i);
            const dayOfWeek = day.getDay();
            if (dayOfWeek === 0 || dayOfWeek === 6)
                continue; // skip weekends
            const start = startOfDay(day);
            const end = endOfDay(day);
            const avgMood = yield (0, exports.calculateAverageMood)(userId, start, end);
            console.log(`[checkLowMoodStreak] User: ${userId}, Date: ${day.toISOString()}, AvgMood: ${avgMood}, Threshold: ${threshold}`);
            if (avgMood < threshold) {
                streakCount++;
            }
            else {
                break;
            }
            console.log(`[checkLowMoodStreak] User: ${userId}, StreakCount: ${streakCount}, Required: ${days}`);
        }
        return streakCount >= days;
    });
}
