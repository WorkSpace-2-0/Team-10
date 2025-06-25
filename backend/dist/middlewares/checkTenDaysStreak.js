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
exports.hasTenDayMoodEntryStreak = hasTenDayMoodEntryStreak;
const mood_entry_1 = require("../models/mood.entry");
function hasTenDayMoodEntryStreak(userId_1) {
    return __awaiter(this, arguments, void 0, function* (userId, streakLength = 10) {
        let streakCount = 0;
        let currentDate = new Date();
        while (streakCount < streakLength) {
            const dayOfWeek = currentDate.getDay();
            if (dayOfWeek === 0 || dayOfWeek === 6) {
                currentDate.setDate(currentDate.getDate() - 1);
                continue;
            }
            const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            const end = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59, 999);
            const count = yield mood_entry_1.MoodEntry.countDocuments({
                userId,
                date: { $gte: start, $lte: end },
            });
            if (count === 0) {
                break;
            }
            streakCount++;
            currentDate.setDate(currentDate.getDate() - 1);
        }
        return streakCount >= streakLength;
    });
}
