import { Request, Response } from "express";
import { profile } from "../../models/profile.model";

const getTopStat = (
  profiles: any[],
  key: "rechargeMethods" | "teamActivities" | "workplaceValues"
) => {
  const counts: Record<string, number> = {};
  const total = profiles.length;

  console.log(
    `Calculating top stats for key: ${key}, total profiles: ${total}`
  );

  for (const p of profiles) {
    const values = p[key];
    if (!Array.isArray(values)) {
      console.warn(
        `Profile ${p._id} key "${key}" is not an array or missing`,
        values
      );
      continue;
    }
    for (const value of values) {
      counts[value] = (counts[value] || 0) + 1;
    }
  }

  console.log(`Counts for ${key}:`, counts);

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
    const profiles = await profile.find().lean(); // <--- key fix here
    console.log("Profiles fetched from DB:", profiles);

    const rechargeTop = getTopStat(profiles, "rechargeMethods");
    const teamActivitiesTop = getTopStat(profiles, "teamActivities");
    const workplaceValuesTop = getTopStat(profiles, "workplaceValues");

    res.status(200).json({
      rechargeMethods: rechargeTop,
      teamActivities: teamActivitiesTop,
      workplaceValues: workplaceValuesTop,
    });
  } catch (err) {
    console.error("Error fetching top choices:", err);
    res.status(500).json({ message: "Failed to get top choices", error: err });
  }
};
