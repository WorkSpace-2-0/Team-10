import { moodEntry } from "../models/mood.entry";

export async function hasTenDayMoodEntryStreak(
  userId: string,
  streakLength = 10
): Promise<boolean> {
  let streakCount = 0;
  let currentDate = new Date();

  while (streakCount < streakLength) {
    const dayOfWeek = currentDate.getDay();

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      currentDate.setDate(currentDate.getDate() - 1);
      continue;
    }

    const start = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    const end = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      23,
      59,
      59,
      999
    );

    const count = await moodEntry.countDocuments({
      userId,
      date: { $gte: start, $lte: end },
    });

    if (count === 0) {
      break;
    }

    streakCount++;
    currentDate.setDate(currentDate.getDate() - 1);
  }

  return streakCount >= streakLength;
}
