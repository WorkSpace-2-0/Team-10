import { getRandomReward } from "../services/rewardService";
import { hasTenDayMoodEntryStreak } from "./checkTenDaysStreak";

export async function checkStreakAndReward(
  userId: string
): Promise<string | null> {
  const streakAchieved = await hasTenDayMoodEntryStreak(userId, 10);

  if (!streakAchieved) {
    return null;
  }

  const reward = await getRandomReward();
  return reward;
}
