import { Request, Response } from "express";
import { moodEntry } from "../../models/mood.entry";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { countConsecutiveMoodEntryDays } from "../../middlewares/statsHelper";

dayjs.extend(isoWeek);

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

type Unit = "day" | "week" | "month";
const VALID_UNITS: Unit[] = ["day", "week", "month"];
const DEFAULT_RANGE_DAYS = 30;

function formatByUnit(date: Date, unit: Unit): string {
  const d = dayjs(date);
  switch (unit) {
    case "day":
      return d.format("YYYY-MM-DD");
    case "week":
      return d.startOf("isoWeek").format("YYYY-MM-DD");
    case "month":
      return d.format("YYYY-MM");
    default:
      return d.format();
  }
}

function suggestUnit(rangeDays: number): Unit {
  if (rangeDays <= 30) return "day";
  if (rangeDays <= 90) return "week";
  return "month";
}

export const getMoodChart = async (req: Request, res: Response) => {
  try {
    const rangeDays = parseInt(req.query.range as string) || DEFAULT_RANGE_DAYS;
    let unit = (req.query.unit as Unit) || suggestUnit(rangeDays);
    if (!VALID_UNITS.includes(unit)) {
      res.status(400).json({ success: false, message: "Invalid unit" });
    }

    const userId = req.query.userId as string | undefined;

    const now = dayjs();
    const start = now.subtract(rangeDays, "day").startOf("day");

    const filter: any = { createdAt: { $gte: start.toDate() } };
    if (userId) filter.userId = userId;

    const entries = await moodEntry.find(filter).lean();

    const filteredEntries = entries.filter((entry) => {
      const dayName = dayjs(entry.createdAt).format("dddd");
      return WEEKDAYS.includes(dayName);
    });

    const moodMap: Record<string, number[]> = {};
    for (const entry of filteredEntries) {
      if (typeof entry.moodScore !== "number") continue;
      const key = formatByUnit(entry.createdAt, unit);
      if (!moodMap[key]) moodMap[key] = [];
      moodMap[key].push(entry.moodScore);
    }

    const data = Object.entries(moodMap)
      .sort(([a], [b]) => (a > b ? 1 : -1))
      .map(([label, moods]) => ({
        label,
        averageMood: +(moods.reduce((a, b) => a + b, 0) / moods.length).toFixed(
          2
        ),
        count: moods.length,
      }));

    res
      .status(200)
      .json({ success: true, data, unit, rangeDays, userId: userId || null });
  } catch (err) {
    console.error("getMoodChart error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getMoodSummary = async (req: Request, res: Response) => {
  try {
    const rangeDays = parseInt(req.query.range as string) || DEFAULT_RANGE_DAYS;
    const userId = req.query.userId as string | undefined;

    const now = dayjs();
    const rangeStart = now.subtract(rangeDays, "day").startOf("day");
    const prevRangeStart = rangeStart.subtract(rangeDays, "day");
    const prevRangeEnd = rangeStart;

    const currentFilter: any = { createdAt: { $gte: rangeStart.toDate() } };
    const prevFilter: any = {
      createdAt: { $gte: prevRangeStart.toDate(), $lt: prevRangeEnd.toDate() },
    };
    if (userId) {
      currentFilter.userId = userId;
      prevFilter.userId = userId;
    }

    const [entries, prevEntries] = await Promise.all([
      moodEntry.find(currentFilter).lean(),
      moodEntry.find(prevFilter).lean(),
    ]);

    const filteredEntries = entries.filter((entry) => {
      const dayName = dayjs(entry.createdAt).format("dddd");
      return WEEKDAYS.includes(dayName);
    });

    const moodByDay: Record<string, number[]> = {};
    const userSet = new Set<string>();

    filteredEntries.forEach((entry) => {
      if (typeof entry.moodScore !== "number") return;
      if (entry.userId) userSet.add(entry.userId.toString());
      const day = dayjs(entry.createdAt).format("dddd");
      if (!moodByDay[day]) moodByDay[day] = [];
      moodByDay[day].push(entry.moodScore);
    });

    const allCurrentMoods = Object.values(moodByDay).flat();
    const overallAverage = allCurrentMoods.length
      ? +(
          allCurrentMoods.reduce((a, b) => a + b, 0) / allCurrentMoods.length
        ).toFixed(2)
      : 0;

    const bestDay =
      Object.entries(moodByDay)
        .map(([day, scores]) => ({
          day,
          avg: scores.reduce((a, b) => a + b, 0) / scores.length,
        }))
        .sort((a, b) => b.avg - a.avg)[0]?.day || null;

    const prevFiltered = prevEntries.filter((entry) => {
      const dayName = dayjs(entry.createdAt).format("dddd");
      return WEEKDAYS.includes(dayName) && typeof entry.moodScore === "number";
    });

    const prevMoods = prevFiltered.map((e) => e.moodScore as number);

    const prevAverage = prevMoods.length
      ? +(prevMoods.reduce((a, b) => a + b, 0) / prevMoods.length).toFixed(2)
      : 0;

    const changePercentage = prevAverage
      ? +(((overallAverage - prevAverage) / prevAverage) * 100).toFixed(2)
      : 0;

    const streakCount = userId
      ? await countConsecutiveMoodEntryDays(userId)
      : 0;

    res.status(200).json({
      success: true,
      bestDay,
      participantCount: userId ? 1 : userSet.size,
      overallAverage,
      changePercentage,
      rangeDays,
      userId: userId || null,
      streakCount,
    });
  } catch (err) {
    console.error("getMoodSummary error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
