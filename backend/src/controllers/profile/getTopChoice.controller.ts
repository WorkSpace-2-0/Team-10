import { Request, Response } from "express";
import { profile } from "../../models/profile.model";

const getTopStat = (profiles: any[], key: "goingOut" | "weekend" | "hobby") => {
  const counts: Record<string, number> = {};
  const total = profiles.length;

  for (const p of profiles) {
    const values = p[key];
    if (!Array.isArray(values)) continue;
    for (const value of values) {
      counts[value] = (counts[value] || 0) + 1;
    }
  }

  let topAnswer = "";
  let topCount = 0;

  for (const [answer, count] of Object.entries(counts)) {
    if (count > topCount) {
      topAnswer = answer;
      topCount = count;
    }
  }

  const percent = total > 0 ? Math.round((topCount / total) * 100) : 0;

  return {
    answer: topAnswer,
    percent,
    description: `${percent}% of your team liked ${topAnswer}`,
  };
};

export const getTopChoices = async (req: Request, res: Response) => {
  try {
    const profiles = await profile.find().lean();

    res.status(200).json({
      goingOut: getTopStat(profiles, "goingOut"),
      weekend: getTopStat(profiles, "weekend"),
      hobby: getTopStat(profiles, "hobby"),
    });
  } catch (err) {
    console.error("Error fetching top choices:", err);
    res.status(500).json({ message: "Failed to get top choices", error: err });
  }
};
