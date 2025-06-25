import { Request, Response } from "express";
import { MoodEntry } from "../../models/mood.entry";

export const deleteSingleMood = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;

    const deletedMood = await MoodEntry.findByIdAndDelete(id);

    if (!deletedMood) {
      return res
        .status(404)
        .json({ success: false, error: "Mood entry not found" });
    }

    return res.status(200).json({ success: true, data: deletedMood });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
