import mongoose from "mongoose";
import dayjs from "dayjs";
import { moodEntry } from "../models/mood.entry";

const MONGO_URI =
  "mongodb+srv://workspace20250720:Lxgiwyl0@workspace.sx6rlqf.mongodb.net/"; // replace with your DB

// Create 10 fake userIds
const fakeUserIds = Array.from(
  { length: 10 },
  () => new mongoose.Types.ObjectId()
);

// Generate random mood score (0.0 to 10.0)
const randomMood = () => +(Math.random() * 10).toFixed(1);

// Get weekday-only dates from start to end
const getWeekdayDates = (start: string, end: string): Date[] => {
  const days: Date[] = [];
  let current = dayjs(start);
  const endDate = dayjs(end);

  while (current.isBefore(endDate)) {
    const day = current.day(); // 0 = Sunday, 6 = Saturday
    if (day !== 0 && day !== 6) {
      days.push(current.toDate());
    }
    current = current.add(1, "day");
  }
  return days;
};

const seed = async () => {
  await mongoose.connect(MONGO_URI);
  console.log("✅ Connected to MongoDB");

  await moodEntry.deleteMany({});
  console.log("🧹 Cleared mood entries");

  const allDates = getWeekdayDates("2025-03-01", "2025-06-21"); // ~3 weeks

  const testData = [];

  for (const userId of fakeUserIds) {
    for (const date of allDates) {
      testData.push({
        userId,
        moodScore: randomMood(),
        createdAt: date,
      });
    }
  }

  await moodEntry.insertMany(testData);
  console.log(`✅ Inserted ${testData.length} mood entries for 10 users`);

  await mongoose.disconnect();
  console.log("🔌 Disconnected");
};

seed();
