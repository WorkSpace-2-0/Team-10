import { Request, Response } from "express";
import { moodEntry } from "../../models/mood.entry";
export const createMood = async (req: Request, res: Response) => {
  try {
    const { userId, moodScore, moodType, note } = req.body;
    if (typeof moodScore !== "number" || moodScore < 0 || moodScore > 10) {
      res.status(400).json({ error: "Mood score must be between 0 and 10" });
    }
    if (!userId) {
      res.status(400).json({ error: "UserId is required" });
    }
    if (
      !moodType ||
      !["ecstatic", "happy", "neutral", "sad", "angry"].includes(moodType)
    ) {
      res.status(400).json({ error: "Invalid mood type" });
    }

    const newMood = new moodEntry({
      userId,
      moodScore,
      note,
    });
    const saveMood = await newMood.save();

    res.status(201).json(saveMood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
