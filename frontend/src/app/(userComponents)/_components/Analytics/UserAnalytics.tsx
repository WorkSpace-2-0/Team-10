"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import MoodChart from "./MoodChart";
import AnalyticsControls from "./AnalyticsControls";
import AnalyticsSummary from "./AnalyticsSummary";
import { useUser } from "../../../../contexts/UserContext";
import { Skel } from "src/components/individual/skeleton";

dayjs.extend(isoWeek);

type MoodEntry = {
  label: string;
  averageMood: number;
  count: number;
};

const UserAnalytics = () => {
  const { userId } = useUser();
  const [unit, setUnit] = useState<"week" | "month">("week");
  const [rangeOffset, setRangeOffset] = useState<number>(0);
  const [chartData, setChartData] = useState<{
    current: MoodEntry[];
    previous: MoodEntry[];
  }>({ current: [], previous: [] });
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRange = () => {
    if (unit === "week") {
      const end = dayjs()
        .startOf("isoWeek")
        .subtract(rangeOffset * 7, "day");
      const start = end.subtract(6, "day");
      return { start, end };
    }
    if (unit === "month") {
      const targetMonth = dayjs().subtract(rangeOffset, "month");
      const start = targetMonth.startOf("month");
      const end = targetMonth.endOf("month");
      return { start, end };
    }
    return { start: dayjs(), end: dayjs() };
  };

  const getRangeDays = () => {
    const { start, end } = getRange();
    return end.diff(start, "day") + 1;
  };

  const rangeLabel = () => {
    const { start, end } = getRange();
    if (unit === "week") {
      return `${start.format("M сарын D")} - ${end.format("M сарын D")}`;
    }
    if (unit === "month") {
      return `${start.format("YYYY оны M сар")}`;
    }
    return "";
  };

  const canGoNext = rangeOffset > 0;

  useEffect(() => {
    const fetchData = async () => {
      if (loading) return; // Prevent multiple concurrent requests

      setLoading(true);
      setError(null);

      try {
        const rangeDays = getRangeDays();

        // Fetch current period data
        const currentRes = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/stats/chart`,
          {
            params: {
              range: rangeDays,
              unit,
              userId,
              rangeOffset,
            },
          }
        );

        // Fetch previous period data for comparison
        const previousRes = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/stats/chart`,
          {
            params: {
              range: rangeDays,
              unit,
              userId,
              rangeOffset: rangeOffset + 1,
            },
          }
        );

        setChartData({
          current: currentRes.data.data || [],
          previous: previousRes.data.data || [],
        });

        // Fetch summary data
        const summaryRes = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/stats/summary`,
          {
            params: {
              range: rangeDays,
              userId,
              rangeOffset,
            },
          }
        );
        setSummary(summaryRes.data);
      } catch (err: any) {
        console.error("Analytics fetch error:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch analytics"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [rangeOffset, unit, userId]);

  const handleUnitChange = (newUnit: "week" | "month") => {
    setUnit(newUnit);
    setRangeOffset(0); // Reset to current period when changing units
  };

  const handleRangeOffsetChange = (delta: number) => {
    setRangeOffset((prev) => {
      const next = prev + delta;
      return next < 0 ? 0 : next; // Don't allow future dates
    });
  };

  return (
    <div className="max-w-7xl w-full mx-auto p-6 flex flex-col gap-4">
      {loading && <Skel />}

      {!loading && error && (
        <div className="text-center text-red-500 py-8">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
          >
            Дахин оролдох
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          <AnalyticsControls
            rangeLabel={rangeLabel()}
            unit={unit}
            onUnitChange={handleUnitChange}
            onRangeOffsetChange={handleRangeOffsetChange}
            canGoNext={canGoNext}
          />
          <AnalyticsSummary summary={summary} range={getRangeDays()} />
          <MoodChart
            data={chartData}
            unit={unit}
            rangeDays={getRangeDays()}
            rangeLabel={rangeLabel()}
          />
        </>
      )}
    </div>
  );
};

export default UserAnalytics;
