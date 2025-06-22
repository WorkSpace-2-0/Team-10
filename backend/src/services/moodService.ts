import { moodEntry } from "../models/mood.entry";

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
function endOfDay(date: Date): Date {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59,
    999
  );
}

export const fetchMoodEntries = async (
  userId: string,
  startDate: Date,
  endDate: Date
) => {
  return await moodEntry.find({
    userId,
    date: { $gte: startOfDay(startDate), $lte: endOfDay(endDate) },
  });
};

export const calculateAverageMood = async (
  userId: string,
  startDate: Date,
  endDate: Date
) => {
  const moods = await fetchMoodEntries(userId, startDate, endDate);
  if (moods.length === 0) return 10;
  const total = moods.reduce((sum, m) => sum + (m.moodScore ?? 0), 0);
  return total / moods.length;
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
    if (dayOfWeek === 0 || dayOfWeek === 6) continue;

    const avgMood = await calculateAverageMood(userId, day, day);
    if (avgMood < threshold) {
      streakCount++;
    } else {
      break;
    }
  }

  return streakCount >= days;
}
