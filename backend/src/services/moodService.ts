import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { moodEntry } from "../models/mood.entry";

dayjs.extend(utc);

export function startOfDay(date: Date): Date {
  return dayjs(date).utc().startOf("day").toDate();
}

export function endOfDay(date: Date): Date {
  return dayjs(date).utc().endOf("day").toDate();
}

export const fetchMoodEntries = async (
  userId: string,
  startDate: Date,
  endDate: Date
) => {
  return await moodEntry.find({
    userId,
    createdAt: { $gte: startOfDay(startDate), $lte: endOfDay(endDate) },
  });
};

export const calculateAverageMood = async (
  userId: string,
  startDate: Date,
  endDate: Date
) => {
  const start = startOfDay(startDate);
  const end = endOfDay(endDate);

  console.log(
    `[calculateAverageMood] User: ${userId}, Query DateRange: ${start.toISOString()} - ${end.toISOString()}`
  );

  const moods = await fetchMoodEntries(userId, start, end);

  if (moods.length === 0) {
    console.log(
      `[calculateAverageMood] User: ${userId}, No mood entries found in range.`
    );
    return 10; // default high mood if no data
  }
  const total = moods.reduce((sum, m) => sum + (m.moodScore ?? 0), 0);
  const avg = total / moods.length;
  console.log(
    `[calculateAverageMood] User: ${userId}, Count: ${moods.length}, AvgMood: ${avg}`
  );
  return avg;
};

export async function checkLowMoodStreak(
  userId: string,
  days: number,
  threshold: number
): Promise<boolean> {
  const today = new Date();
  let streakCount = 0;

  for (let i = 0; i < days; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);

    const dayOfWeek = day.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) continue; // skip weekends

    const start = startOfDay(day);
    const end = endOfDay(day);
    const avgMood = await calculateAverageMood(userId, start, end);

    console.log(
      `[checkLowMoodStreak] User: ${userId}, Date: ${day.toISOString()}, AvgMood: ${avgMood}, Threshold: ${threshold}`
    );

    if (avgMood < threshold) {
      streakCount++;
    } else {
      break;
    }
    console.log(
      `[checkLowMoodStreak] User: ${userId}, StreakCount: ${streakCount}, Required: ${days}`
    );
  }

  return streakCount >= days;
}
