import mongoose from "mongoose";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { MoodEntry } from "../src/models/mood.entry";

dayjs.extend(utc);

const MONGO_URI =
  "mongodb+srv://workspace20250720:Lxgiwyl0@workspace.sx6rlqf.mongodb.net/";

// Static user IDs as strings
const userIds = [
  "685509af5e4b694cbf130817",
  "6859402be77aef6a6ae0d461",
  "68597d890e5c6aa50243a223",
  "685b882082250a45dbfa804f",
  "685b883282250a45dbfa8053",
  "685b884982250a45dbfa8056",
  "685b885082250a45dbfa8059",
  "685b885882250a45dbfa805c",
  "685b886682250a45dbfa805f",
];

// Get mood title from score
const getMoodTitle = (score: number): string => {
  const moods = [
    { label: "Хэцүү", min: 0, max: 2 },
    { label: "Тавгүй", min: 2, max: 4 },
    { label: "Хэвийн", min: 4, max: 6 },
    { label: "Дажгүй шүү", min: 6, max: 8 },
    { label: "Супер", min: 8, max: 10.01 },
  ];

  return moods.find((m) => score >= m.min && score < m.max)?.label || "Хэвийн";
};

// Generate all weekday dates between start and end (inclusive)
const getWeekdayDates = (start: string, end: string): Date[] => {
  const result: Date[] = [];
  let current = dayjs.utc(start);
  const endDate = dayjs.utc(end);

  while (!current.isAfter(endDate)) {
    const weekday = current.day();
    if (weekday !== 0 && weekday !== 6) {
      result.push(current.toDate());
    }
    current = current.add(1, "day");
  }

  return result;
};

interface MoodEntryType {
  userId: mongoose.Types.ObjectId;
  moodScore: number;
  moodTitle: string;
  note: string;
  createdAt: Date;
}

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const allDates = getWeekdayDates("2025-03-01", "2025-06-21");
    const entries: MoodEntryType[] = [];

    for (const userId of userIds) {
      for (const date of allDates) {
        const score = +(Math.random() * 5 + 5).toFixed(1); // score between 5 and 10
        entries.push({
          userId: new mongoose.Types.ObjectId(userId),
          moodScore: score,
          moodTitle: getMoodTitle(score),
          note: "demo",
          createdAt: date,
        });
      }
    }

    await MoodEntry.insertMany(entries);
    console.log(`✅ Inserted ${entries.length} demo mood entries`);

    await mongoose.disconnect();
    console.log("🔌 Disconnected");
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
};

seed();
