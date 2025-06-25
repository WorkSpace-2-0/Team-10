import { getRandomReward } from "../services/rewardService";
import { hasTenDayMoodEntryStreak } from "./checkTenDaysStreak";

export async function checkStreakAndReward(
  userId: string
): Promise<string | null> {
  const streakAchieved = await hasTenDayMoodEntryStreak(userId, 10);

  console.log(
    `[checkStreakAndReward] Streak achieved for ${userId}: ${streakAchieved}`
  );

  if (!streakAchieved) return null;

  const reward = await getRandomReward();
  console.log(`[checkStreakAndReward] Reward granted to ${userId}: ${reward}`);
  return reward;
}
