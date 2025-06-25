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
exports.getMoodSummary = exports.getMoodChart = void 0;
const mood_entry_1 = require("../../models/mood.entry");
const dayjs_1 = __importDefault(require("dayjs"));
const isoWeek_1 = __importDefault(require("dayjs/plugin/isoWeek"));
const statsHelper_1 = require("../../middlewares/statsHelper");
const user_model_1 = require("../../models/user.model");
dayjs_1.default.extend(isoWeek_1.default);
const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const VALID_UNITS = ["day", "week", "month"];
const DEFAULT_RANGE_DAYS = 30;
function formatByUnit(date, unit) {
    const d = (0, dayjs_1.default)(date);
    switch (unit) {
        case "day":
            return d.format("YYYY-MM-DD");
        case "week":
            return d.startOf("isoWeek").format("YYYY-MM-DD");
        case "month":
            return d.format("YYYY-MM");
        default:
            return d.format();
    }
}
function suggestUnit(rangeDays) {
    if (rangeDays <= 30)
        return "day";
    if (rangeDays <= 90)
        return "week";
    return "month";
}
const getMoodChart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rangeDays = parseInt(req.query.range) || DEFAULT_RANGE_DAYS;
        let unit = req.query.unit || suggestUnit(rangeDays);
        if (!VALID_UNITS.includes(unit)) {
            res.status(400).json({ success: false, message: "Invalid unit" });
        }
        const userId = req.query.userId;
        const now = (0, dayjs_1.default)();
        const start = now.subtract(rangeDays, "day").startOf("day");
        const filter = { createdAt: { $gte: start.toDate() } };
        if (userId)
            filter.userId = userId;
        const entries = yield mood_entry_1.MoodEntry.find(filter).lean();
        const filteredEntries = entries.filter((entry) => {
            const dayName = (0, dayjs_1.default)(entry.createdAt).format("dddd");
            return WEEKDAYS.includes(dayName);
        });
        const moodMap = {};
        for (const entry of filteredEntries) {
            if (typeof entry.moodScore !== "number")
                continue;
            const key = formatByUnit(entry.createdAt, unit);
            if (!moodMap[key])
                moodMap[key] = [];
            moodMap[key].push(entry.moodScore);
        }
        const data = Object.entries(moodMap)
            .sort(([a], [b]) => (a > b ? 1 : -1))
            .map(([label, moods]) => ({
            label,
            averageMood: +(moods.reduce((a, b) => a + b, 0) / moods.length).toFixed(2),
            count: moods.length,
        }));
        res
            .status(200)
            .json({ success: true, data, unit, rangeDays, userId: userId || null });
    }
    catch (err) {
        console.error("getMoodChart error:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.getMoodChart = getMoodChart;
const getMoodSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const rangeDays = parseInt(req.query.range) || DEFAULT_RANGE_DAYS;
        const userId = req.query.userId;
        const now = (0, dayjs_1.default)();
        const rangeStart = now.subtract(rangeDays, "day").startOf("day");
        const prevRangeStart = rangeStart.subtract(rangeDays, "day");
        const prevRangeEnd = rangeStart;
        const currentFilter = { createdAt: { $gte: rangeStart.toDate() } };
        const prevFilter = {
            createdAt: { $gte: prevRangeStart.toDate(), $lt: prevRangeEnd.toDate() },
        };
        if (userId) {
            currentFilter.userId = userId;
            prevFilter.userId = userId;
        }
        const [entries, prevEntries] = yield Promise.all([
            mood_entry_1.MoodEntry.find(currentFilter).lean(),
            mood_entry_1.MoodEntry.find(prevFilter).lean(),
        ]);
        const filteredEntries = entries.filter((entry) => {
            const dayName = (0, dayjs_1.default)(entry.createdAt).format("dddd");
            return WEEKDAYS.includes(dayName);
        });
        const moodByDay = {};
        const userSet = new Set();
        filteredEntries.forEach((entry) => {
            if (typeof entry.moodScore !== "number")
                return;
            if (entry.userId)
                userSet.add(entry.userId.toString());
            const day = (0, dayjs_1.default)(entry.createdAt).format("dddd");
            if (!moodByDay[day])
                moodByDay[day] = [];
            moodByDay[day].push(entry.moodScore);
        });
        const allCurrentMoods = Object.values(moodByDay).flat();
        const overallAverage = allCurrentMoods.length
            ? +(allCurrentMoods.reduce((a, b) => a + b, 0) / allCurrentMoods.length).toFixed(2)
            : 0;
        const bestDay = ((_a = Object.entries(moodByDay)
            .map(([day, scores]) => ({
            day,
            avg: scores.reduce((a, b) => a + b, 0) / scores.length,
        }))
            .sort((a, b) => b.avg - a.avg)[0]) === null || _a === void 0 ? void 0 : _a.day) || null;
        const prevFiltered = prevEntries.filter((entry) => {
            const dayName = (0, dayjs_1.default)(entry.createdAt).format("dddd");
            return WEEKDAYS.includes(dayName) && typeof entry.moodScore === "number";
        });
        const prevMoods = prevFiltered.map((e) => e.moodScore);
        const prevAverage = prevMoods.length
            ? +(prevMoods.reduce((a, b) => a + b, 0) / prevMoods.length).toFixed(2)
            : 0;
        const changePercentage = prevAverage
            ? +(((overallAverage - prevAverage) / prevAverage) * 100).toFixed(2)
            : 0;
        const totalUsers = yield user_model_1.User.countDocuments();
        const streakCount = userId
            ? yield (0, statsHelper_1.countConsecutiveMoodEntryDays)(userId)
            : 0;
        const participantCount = userSet.size;
        res.status(200).json({
            success: true,
            bestDay,
            totalUsers,
            overallAverage,
            changePercentage,
            rangeDays,
            participantCount,
            userId: userId || null,
            streakCount,
        });
    }
    catch (err) {
        console.error("getMoodSummary error:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.getMoodSummary = getMoodSummary;
