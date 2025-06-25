import { Request, Response } from "express";
import { MoodEntry } from "../../models/mood.entry";

export const deleteMood = async (req: Request, res: Response) => {
  try {
    const result = await MoodEntry.deleteMany(); // this deletes ALL documents

    res.status(200).json({
      success: true,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

