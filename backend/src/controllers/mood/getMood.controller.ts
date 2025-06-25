// backend/controllers/moodController.ts
import { Request, Response } from "express";
import { MoodEntry } from "../../models/mood.entry";

type FormattedMood = {
  _id: string;
  userId: string;
  moodScore: number;
  moodTitle: string;
  note: string;
  createdAt: string;  
};

// Get all moods
export const getAllMoods = async (_req: Request, res: Response): Promise<any> => {
  try {
    const moods = await MoodEntry.find().sort({ createdAt: -1 });

    const formattedMoods: FormattedMood[] = moods.map((mood: any) => ({
      _id: mood._id.toString(),
      userId: mood.userId.toString(),
      moodScore: mood.moodScore,
      moodTitle: mood.moodTitle,
      note: mood.note,
      createdAt: mood.createdAt.toISOString(),    
    }));

    res.json(formattedMoods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get moods for a specific user
export const getUserMoods = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ error: "UserId is required" });

    const moods = await MoodEntry.find({ userId }).sort({ createdAt: -1 });

    const formattedMoods: FormattedMood[] = moods.map((mood: any) => ({
      _id: mood._id.toString(),
      userId: mood.userId.toString(),
      moodScore: mood.moodScore,
      moodTitle: mood.moodTitle,
      note: mood.note,
      createdAt: mood.createdAt.toISOString(), // <-- ISO string here
    }));

    res.json(formattedMoods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
