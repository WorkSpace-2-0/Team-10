import { Request, Response } from "express";
import { profile } from "../../models/profile.model";

const getTopStat = (
  profiles: any[],
  key: "rechargeMethods" | "teamActivities" | "workplaceValues"
) => {
  const counts: Record<string, number> = {};
  const total = profiles.length;

  for (const p of profiles) {
    for (const value of p[key] || []) {
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
    const profiles = await profile.find();

    const rechargeTop = getTopStat(profiles, "rechargeMethods");
    const teamActivitiesTop = getTopStat(profiles, "teamActivities");
    const workplaceValuesTop = getTopStat(profiles, "workplaceValues");

    res.status(200).json({
      rechargeMethods: rechargeTop,
      teamActivities: teamActivitiesTop,
      workplaceValues: workplaceValuesTop,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to get top choices", error: err });
  }
};
