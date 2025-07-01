import { Request, Response } from "express";
import { MoodEntry } from "../../models/mood.entry";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { countConsecutiveMoodEntryDays } from "../../middlewares/statsHelper";
import { User } from "../../models/user.model";

dayjs.extend(isoWeek);

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

type Unit = "week" | "month";
const VALID_UNITS: Unit[] = ["week", "month"];

function formatByUnit(date: Date, unit: Unit, rangeStart: dayjs.Dayjs): string {
  const d = dayjs(date);
  switch (unit) {
    case "week":
      return d.format("dddd"); // Return day name for week view
    case "month":
      // For month view, group by week ranges within the month
      const dayOfMonth = d.date();
      const weekInMonth = Math.ceil(dayOfMonth / 7);
      const startDay = (weekInMonth - 1) * 7 + 1;
      const endDay = Math.min(weekInMonth * 7, d.daysInMonth());
      return `${startDay}-${endDay}`;
    default:
      return d.format();
  }
}

const DEFAULT_RANGE_DAYS = 7;

export const getMoodChart = async (req: Request, res: Response) => {
  try {
    const range = parseInt(req.query.range as string) || 14; // Default 14 days for 2 weeks
    let unit = (req.query.unit as Unit) || "week";

    if (!VALID_UNITS.includes(unit)) {
      res.status(400).json({ success: false, message: "Invalid unit" });
    }

    const userId = req.query.userId as string | undefined;
    const rangeOffset = parseInt(req.query.rangeOffset as string) || 0;

    const now = dayjs();
    let start: dayjs.Dayjs;
    let end: dayjs.Dayjs;

    if (unit === "week") {
      // For week view, get the specific week
      end = now.startOf("isoWeek").subtract(rangeOffset * 7, "day");
      start = end.subtract(6, "day");
    } else {
      // For month view, get the specific month
      const targetMonth = now.subtract(rangeOffset, "month");
      start = targetMonth.startOf("month");
      end = targetMonth.endOf("month");
    }

    const filter: any = {
      createdAt: {
        $gte: start.toDate(),
        $lte: end.toDate(),
      },
    };
    if (userId) filter.userId = userId;

    const entries = await MoodEntry.find(filter).lean();

    const filteredEntries = entries.filter((entry) => {
      const dayName = dayjs(entry.createdAt).format("dddd");
      return WEEKDAYS.includes(dayName);
    });

    const moodMap: Record<string, number[]> = {};

    for (const entry of filteredEntries) {
      if (typeof entry.moodScore !== "number") continue;
      const key = formatByUnit(entry.createdAt, unit, start);
      if (!moodMap[key]) moodMap[key] = [];
      moodMap[key].push(entry.moodScore);
    }

    let data;

    if (unit === "week") {
      // For week view, ensure all weekdays are present
      const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
      data = weekdays.map((day) => ({
        label: day,
        averageMood: moodMap[day]
          ? +(
              moodMap[day].reduce((a, b) => a + b, 0) / moodMap[day].length
            ).toFixed(2)
          : 0,
        count: moodMap[day] ? moodMap[day].length : 0,
      }));
    } else {
      // For month view, sort by week ranges
      data = Object.entries(moodMap)
        .sort(([a], [b]) => {
          const aStart = parseInt(a.split("-")[0]);
          const bStart = parseInt(b.split("-")[0]);
          return aStart - bStart;
        })
        .map(([label, moods]) => ({
          label,
          averageMood: +(
            moods.reduce((a, b) => a + b, 0) / moods.length
          ).toFixed(2),
          count: moods.length,
        }));
    }

    res.status(200).json({
      success: true,
      data,
      unit,
      range,
      rangeOffset,
      period: {
        start: start.format("YYYY-MM-DD"),
        end: end.format("YYYY-MM-DD"),
      },
      userId: userId || null,
    });
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
      MoodEntry.find(currentFilter).lean(),
      MoodEntry.find(prevFilter).lean(),
    ]);

    const filteredEntries = entries.filter((entry) => {
      const dayName = dayjs(entry.createdAt).format("dddd");
      return WEEKDAYS.includes(dayName);
    });

    const moodByDay: Record<string, number[]> = {};
    const userSet = new Set<string>();
    const moodTitleCount: Record<string, number> = {};

    filteredEntries.forEach((entry) => {
      if (typeof entry.moodScore !== "number") return;
      if (entry.userId) userSet.add(entry.userId.toString());

      const day = dayjs(entry.createdAt).format("dddd");
      if (!moodByDay[day]) moodByDay[day] = [];
      moodByDay[day].push(entry.moodScore);

      // Count mood titles
      if (entry.moodTitle) {
        moodTitleCount[entry.moodTitle] =
          (moodTitleCount[entry.moodTitle] || 0) + 1;
      }
    });

    const allCurrentMoods = Object.values(moodByDay).flat();
    const overallAverage = allCurrentMoods.length
      ? +(
          allCurrentMoods.reduce((a, b) => a + b, 0) / allCurrentMoods.length
        ).toFixed(2)
      : 0;

    // Best mood day (highest average)
    const bestDay =
      Object.entries(moodByDay)
        .map(([day, scores]) => ({
          day,
          avg: scores.reduce((a, b) => a + b, 0) / scores.length,
        }))
        .sort((a, b) => b.avg - a.avg)[0]?.day || null;

    // Lowest mood day (lowest average)
    const lowestDay =
      Object.entries(moodByDay)
        .map(([day, scores]) => ({
          day,
          avg: scores.reduce((a, b) => a + b, 0) / scores.length,
        }))
        .sort((a, b) => a.avg - b.avg)[0]?.day || null;

    // Most frequent mood title
    const topMoodTitle =
      Object.entries(moodTitleCount).sort((a, b) => b[1] - a[1])[0]?.[0] ||
      null;

    // Previous entries for change %
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

    const totalUsers = await User.countDocuments();
    const streakCount = userId
      ? await countConsecutiveMoodEntryDays(userId)
      : 0;
    const participantCount = userSet.size;

    res.status(200).json({
      success: true,
      bestDay,
      lowestDay,
      topMoodTitle,
      totalUsers,
      overallAverage,
      changePercentage,
      rangeDays,
      participantCount,
      streakCount,
      userId: userId || null,
    });
  } catch (err) {
    console.error("getMoodSummary error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
