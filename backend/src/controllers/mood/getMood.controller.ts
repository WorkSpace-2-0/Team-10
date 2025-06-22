import { Request, Response } from "express";
import moodEntry from "../../models/mood.entry";

export const getAllMoods = async (_req: Request, res: Response) => {
  try {
    const moods = await moodEntry.find().sort({ createdAt: -1 });
    res.json(moods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getUserMoods = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({ error: "UserId is required" });
    }

    const filter: any = { userId };

    const moods = await moodEntry.find(filter).sort({ createdAt: -1 });
    res.json(moods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
