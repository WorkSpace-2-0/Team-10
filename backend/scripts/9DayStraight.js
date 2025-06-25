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
const mongoose_1 = __importDefault(require("mongoose"));
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const mood_entry_1 = require("../src/models/mood.entry");
dayjs_1.default.extend(utc_1.default);
const MONGO_URI = "mongodb+srv://workspace20250720:Lxgiwyl0@workspace.sx6rlqf.mongodb.net/";
const userId = "68567d4fe93a30f6a7174e6a";
const getMoodTitle = (score) => {
    var _a;
    const moods = [
        { label: "Хэцүү", min: 0, max: 2 },
        { label: "Тавгүй", min: 2, max: 4 },
        { label: "Хэвийн", min: 4, max: 6 },
        { label: "Дажгүй шүү", min: 6, max: 8 },
        { label: "Супер", min: 8, max: 10.01 },
    ];
    return ((_a = moods.find((m) => score >= m.min && score < m.max)) === null || _a === void 0 ? void 0 : _a.label) || "Хэвийн";
};
const seed = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(MONGO_URI);
        console.log("✅ Connected to MongoDB");
        const entries = [];
        let date = dayjs_1.default.utc().startOf("day").subtract(1, "day"); // start from yesterday
        let insertedDays = 0;
        while (insertedDays < 9) {
            const dayOfWeek = date.day();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                // skip weekends
                const moodScore = +(Math.random() * 5 + 5).toFixed(1);
                const moodTitle = getMoodTitle(moodScore);
                entries.push({
                    userId,
                    moodScore,
                    moodTitle,
                    note: "demo",
                    createdAt: date.toDate(),
                });
                insertedDays++;
            }
            date = date.subtract(1, "day"); // go back one day
        }
        yield mood_entry_1.MoodEntry.insertMany(entries);
        console.log(`✅ Inserted ${entries.length} mood entries for user ${userId}`);
        yield mongoose_1.default.disconnect();
        console.log("🔌 Disconnected");
    }
    catch (error) {
        console.error("❌ Seed error:", error);
        process.exit(1);
    }
});
seed();
