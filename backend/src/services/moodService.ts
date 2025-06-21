import { moodEntry } from "../models/mood.entry";

export const fetchMoodEntries = async (
  userId: string,
  startDate: Date,
  endDate: Date
) => {
  return await moodEntry.find({
    userId,
    date: { $gte: startDate, $lte: endDate },
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

// Check if there is a streak of N consecutive weekdays with average mood below threshold
export async function checkLowMoodStreak(
  userId: string, // Add userId parameter here
  days: number,
  threshold: number
): Promise<boolean> {
  const today = new Date();
  let streakCount = 0;

  for (let i = 0; i < days; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);

    // Skip weekends
    const dayOfWeek = day.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) continue;

    // Pass userId along with startDate and endDate (same day)
    const avgMood = await calculateAverageMood(userId, day, day);
    if (avgMood < threshold) {
      streakCount++;
    } else {
      break; // Streak broken
    }
  }

  return streakCount >= days;
}
