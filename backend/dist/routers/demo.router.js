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
exports.demoRouter = void 0;
const express_1 = __importDefault(require("express"));
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const user_model_1 = require("../models/user.model");
const mood_entry_1 = require("../models/mood.entry");
const moodAlertService_1 = require("../services/moodAlertService");
dayjs_1.default.extend(utc_1.default);
exports.demoRouter = express_1.default.Router();
// Insert 5-day low mood streak for all users
exports.demoRouter.post("/demo/insertLowMoodStreakAllUsers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.User.find({}, { _id: 1 }).lean();
        const now = (0, dayjs_1.default)().utc().startOf("day");
        const entries = [];
        for (const user of users) {
            let date = now.subtract(1, "day");
            let count = 0;
            while (count < 5) {
                if (date.day() !== 0 && date.day() !== 6) {
                    entries.push({
                        userId: user._id,
                        moodScore: 3, // low mood
                        createdAt: date.toDate(),
                    });
                    count++;
                }
                date = date.subtract(1, "day");
            }
        }
        yield mood_entry_1.MoodEntry.insertMany(entries);
        res.json({
            success: true,
            message: "Inserted 5-day low mood streak for all users",
        });
    }
    catch (error) {
        console.error("Error inserting low mood streak data:", error);
        res.status(500).json({
            success: false,
            message: "Failed to insert low mood streak data",
        });
    }
}));
// Insert periodic low mood data for all users (last 2 weeks)
exports.demoRouter.post("/demo/insertPeriodicLowMoodAllUsers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.User.find({}, { _id: 1 }).lean();
        const now = (0, dayjs_1.default)().utc().startOf("day");
        const entries = [];
        for (const user of users) {
            for (let i = 0; i <= 14; i += 3) {
                const d = now.subtract(i, "day");
                if (d.day() !== 0 && d.day() !== 6) {
                    entries.push({
                        userId: user._id,
                        moodScore: 4, // low mood
                        createdAt: d.toDate(),
                    });
                }
            }
        }
        yield mood_entry_1.MoodEntry.insertMany(entries);
        res.json({
            success: true,
            message: "Inserted periodic low mood data for all users",
        });
    }
    catch (error) {
        console.error("Error inserting periodic low mood data:", error);
        res.status(500).json({
            success: false,
            message: "Failed to insert periodic low mood data",
        });
    }
}));
exports.demoRouter.post("/demo/triggerAlerts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, moodAlertService_1.sendStreakAlertIfNeeded)(true);
        yield (0, moodAlertService_1.sendPeriodicAlertIfNeeded)(true);
        res.json({ success: true, message: "Demo alerts triggered" });
    }
    catch (error) {
        console.error("Error triggering demo alerts:", error);
        res
            .status(500)
            .json({ success: false, message: "Failed to trigger demo alerts" });
    }
}));
