import { MoodEntry } from "../models/mood.entry";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const WEEKEND_DAYS = [0, 6]; // Sunday=0, Saturday=6

export async function countConsecutiveMoodEntryDays(
  userId: string
): Promise<number> {
  // Find the latest mood entry for the user
  const latestEntry = await MoodEntry.findOne({ userId })
    .sort({ createdAt: -1 })
    .lean();

  if (!latestEntry) {
    console.log("No mood entries found for user:", userId);
    return 0;
  }

  let streakCount = 0;
  let currentDate = dayjs(latestEntry.createdAt).utc().startOf("day");

  while (true) {
    // Skip weekends — if you want to count weekends, remove this block
    if (WEEKEND_DAYS.includes(currentDate.day())) {
      currentDate = currentDate.subtract(1, "day");
      continue;
    }

    const start = currentDate.startOf("day").toDate();
    const end = currentDate.endOf("day").toDate();

    // Count mood entries on currentDate
    const count = await MoodEntry.countDocuments({
      userId,
      createdAt: { $gte: start, $lte: end },
    });

    console.log(
      `Checking date ${currentDate.format(
        "YYYY-MM-DD"
      )} - entries found: ${count}`
    );

    if (count === 0) break; // Streak broken

    streakCount++;
    currentDate = currentDate.subtract(1, "day");
  }

  console.log(`Final streak count for user ${userId}: ${streakCount}`);
  return streakCount;
}
