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
exports.sendDailyReminderEmails = sendDailyReminderEmails;
exports.sendStreakAlertIfNeeded = sendStreakAlertIfNeeded;
exports.sendPeriodicAlertIfNeeded = sendPeriodicAlertIfNeeded;
const user_model_1 = require("../models/user.model");
const emailService_1 = require("./emailService");
const moodService_1 = require("./moodService");
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";
const MOOD_THRESHOLD = 5;
const DEMO_MOOD_THRESHOLD = 7;
const STREAK_DAYS = 3;
function sendDailyReminderEmails() {
    return __awaiter(this, arguments, void 0, function* (demoMode = false) {
        const users = yield user_model_1.User.find({}, { email: 1 }).lean();
        const userEmails = users.map((u) => u.email).filter(Boolean);
        for (const email of userEmails) {
            yield (0, emailService_1.sendEmail)(email, "Daily Mood Tracker Reminder", "Please remember to log your mood today!");
        }
        console.log("Daily reminder emails sent.");
    });
}
function sendStreakAlertIfNeeded() {
    return __awaiter(this, arguments, void 0, function* (demoMode = false) {
        const users = yield user_model_1.User.find({}, { _id: 1 }).lean();
        const threshold = demoMode ? DEMO_MOOD_THRESHOLD : MOOD_THRESHOLD;
        for (const user of users) {
            console.log(`[sendStreakAlertIfNeeded] Checking user ${user._id} with threshold ${threshold}`);
            const hasLowMoodStreak = yield (0, moodService_1.checkLowMoodStreak)(user._id.toString(), STREAK_DAYS, threshold);
            if (hasLowMoodStreak) {
                console.log(`[sendStreakAlertIfNeeded] User ${user._id} has low mood streak. Sending email.`);
                yield (0, emailService_1.sendEmail)(ADMIN_EMAIL, "Mood Alert: Low Mood Streak Detected", `User ${user._id} has a streak of ${STREAK_DAYS}+ weekdays with average mood below ${threshold}. Please check the dashboard.`);
                console.log(`Streak alert email sent for user ${user._id}`);
            }
        }
    });
}
function sendPeriodicAlertIfNeeded() {
    return __awaiter(this, arguments, void 0, function* (demoMode = false) {
        const users = yield user_model_1.User.find({}, { _id: 1 }).lean();
        const today = new Date();
        const threshold = demoMode ? DEMO_MOOD_THRESHOLD : MOOD_THRESHOLD;
        for (const user of users) {
            console.log(`[sendPeriodicAlertIfNeeded] Checking user ${user._id} with threshold ${threshold}`);
            const twoWeeksAgo = new Date(today);
            twoWeeksAgo.setDate(today.getDate() - 14);
            const oneMonthAgo = new Date(today);
            oneMonthAgo.setMonth(today.getMonth() - 1);
            const twoWeekStart = (0, moodService_1.startOfDay)(twoWeeksAgo);
            const monthStart = (0, moodService_1.startOfDay)(oneMonthAgo);
            const todayEnd = (0, moodService_1.endOfDay)(today);
            const twoWeekAvg = yield (0, moodService_1.calculateAverageMood)(user._id.toString(), twoWeekStart, todayEnd);
            const monthlyAvg = yield (0, moodService_1.calculateAverageMood)(user._id.toString(), monthStart, todayEnd);
            if (twoWeekAvg < threshold) {
                console.log(`[sendPeriodicAlertIfNeeded] Sending 2-week alert for user ${user._id}`);
                yield (0, emailService_1.sendEmail)(ADMIN_EMAIL, "Mood Alert: 2-Week Average Mood Low", `User ${user._id} has an average mood of ${twoWeekAvg.toFixed(2)} over the last 2 weeks. Please review.`);
                console.log(`2-week periodic alert sent for user ${user._id}`);
            }
            if (monthlyAvg < threshold) {
                console.log(`[sendPeriodicAlertIfNeeded] Sending monthly alert for user ${user._id}`);
                yield (0, emailService_1.sendEmail)(ADMIN_EMAIL, "Mood Alert: Monthly Average Mood Low", `User ${user._id} has an average mood of ${monthlyAvg.toFixed(2)} over the last month. Please review.`);
                console.log(`Monthly periodic alert sent for user ${user._id}`);
            }
        }
    });
}
