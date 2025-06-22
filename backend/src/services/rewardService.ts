import { reward } from "../models/reward.model";

export async function getRandomReward(): Promise<string | null> {
  const count = await reward.countDocuments();
  if (count === 0) return null;

  const randomIndex = Math.floor(Math.random() * count);
  const randomReward = await reward.findOne().skip(randomIndex).exec();

  return randomReward?.rewardTitle || null;
}
