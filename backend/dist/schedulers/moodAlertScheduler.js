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
exports.startMoodAlertScheduler = startMoodAlertScheduler;
const node_cron_1 = __importDefault(require("node-cron"));
const moodAlertService_1 = require("../services/moodAlertService");
function startMoodAlertScheduler() {
    console.log("Starting mood alert scheduler...");
    node_cron_1.default.schedule("* * * * *", () => __awaiter(this, void 0, void 0, function* () {
        console.log("Mood alert scheduler triggered at", new Date().toISOString());
        try {
            yield (0, moodAlertService_1.sendDailyReminderEmails)(true);
            yield (0, moodAlertService_1.sendStreakAlertIfNeeded)(true);
            yield (0, moodAlertService_1.sendPeriodicAlertIfNeeded)(true);
            console.log("Mood alert scheduler finished successfully.");
        }
        catch (error) {
            console.error("Error in mood alert scheduler:", error);
        }
    }));
}
