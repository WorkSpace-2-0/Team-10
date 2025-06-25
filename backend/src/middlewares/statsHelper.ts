import { MoodEntry } from "../models/mood.entry";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
dayjs.extend(utc);

const WEEKEND_DAYS = [0, 6];

export async function countConsecutiveMoodEntryDays(
  userId: string
): Promise<number> {
  let streakCount = 0;
  let currentDate = dayjs().utc();

  while (true) {
    if (WEEKEND_DAYS.includes(currentDate.day())) {
      currentDate = currentDate.subtract(1, "day");
      continue;
    }

    const start = currentDate.startOf("day").toDate();
    const end = currentDate.endOf("day").toDate();

    const count = await MoodEntry.countDocuments({
      userId,
      createdAt: { $gte: start, $lte: end },
    });

    if (count === 0) break;

    streakCount++;
    currentDate = currentDate.subtract(1, "day");
  }

  return streakCount;
}
