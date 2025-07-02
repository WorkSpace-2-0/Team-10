import { reward } from "../models/reward.model";
import { User } from "../models/user.model";
export async function getRandomReward(): Promise<any | null> {
  const count = await reward.countDocuments();
  if (count === 0) return null;

  const randomIndex = Math.floor(Math.random() * count);
  const randomReward = await reward.findOne().skip(randomIndex).exec();

  return randomReward || null;
}

export async function saveUserReward(userId: string, reward: any) {
  await User.findByIdAndUpdate(userId, {
    $push: {
      rewards: {
        rewardTitle: reward.rewardTitle,
        description: reward.description,
        code: reward.code,
        expireDay: reward.expireDay,
        value: reward.value,
        date: new Date(),
      },
    },
  });
}
