import { Request, Response } from "express";
import { moodEntry } from "../../models/mood.entry";
import { checkStreakAndReward } from "../../middlewares/checkAndRewardUser";
import { saveUserReward } from "../../services/rewardService";

export const createMood = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const { moodScore, note } = req.body;

    if (!userId) {
      res.status(400).json({ error: "UserId is required" });
    }

    const newMood = new moodEntry({
      userId,
      moodScore,
      note,
    });

    const saveMood = await newMood.save();

    const reward = await checkStreakAndReward(userId);
    if (reward) {
      await saveUserReward(userId, reward);
    }

    res.status(201).json({
      success: true,
      mood: saveMood,
      reward: reward || undefined,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
