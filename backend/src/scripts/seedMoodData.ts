import mongoose from "mongoose";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { User } from "../models/user.model";
import { MoodEntry } from "../models/mood.entry";

const MONGO_URI =
  "mongodb+srv://workspace20250720:Lxgiwyl0@workspace.sx6rlqf.mongodb.net/";

dayjs.extend(utc);

// Generate realistic mood score with patterns
const generateMoodScore = (
  date: Date,
  userId: string,
  index: number
): number => {
  let mood = 7.5 + Math.random();

  mood += Math.random() * 1.5 - 0.75;

  if (index % 7 === 0) {
    mood += Math.random() * 0.3;
  }

  if (Math.random() < 0.05) {
    mood -= Math.random() * 1.5;
  }

  mood = Math.max(6, Math.min(10, mood));

  const userFactor = Math.sin(userId.toString().length * 0.1) * 0.3;
  mood += userFactor;

  return +mood.toFixed(1);
};

const getWeekdayDates = (start: string, end: string): Date[] => {
  const days: Date[] = [];
  let current = dayjs.utc(start);
  const endDate = dayjs.utc(end);

  while (!current.isAfter(endDate)) {
    const day = current.day();
    if (day !== 0 && day !== 6) {
      days.push(current.toDate());
    }
    current = current.add(1, "day");
  }
  return days;
};

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const users = await User.find({}, { _id: 1 }).lean();
    if (users.length === 0) {
      console.error("No users found in User collection. Seed aborted.");
      process.exit(1);
    }
    console.log(`👥 Found ${users.length} users`);

    await MoodEntry.deleteMany({});
    console.log("🧹 Cleared mood entries");

    const allDates = getWeekdayDates("2025-03-01", "2025-06-21");

    const testData = [];

    for (const user of users) {
      const userIdStr = user._id.toString();
      for (let i = 0; i < allDates.length; i++) {
        const date = allDates[i];
        testData.push({
          userId: user._id,
          moodScore: generateMoodScore(date, userIdStr, i),
          createdAt: date,
        });
      }
    }

    await MoodEntry.insertMany(testData);
    console.log(
      `✅ Inserted ${testData.length} mood entries for ${users.length} users`
    );

    await mongoose.disconnect();
    console.log("🔌 Disconnected");
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seed();
