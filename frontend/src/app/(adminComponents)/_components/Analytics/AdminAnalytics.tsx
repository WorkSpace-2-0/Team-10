"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import MoodChart from "@/app/(userComponents)/_components/Analytics/MoodChart";
import AnalyticsControls from "@/app/(userComponents)/_components/Analytics/AnalyticsControls";
import AdminAnalyticsSummary from "./AdminAnalyticsSummary";
import { useUser } from "@/contexts/UserContext";

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const AdminAnalytics = () => {
  const [rangeDays, setRangeDays] = useState<number>(30);
  const [unit, setUnit] = useState<"day" | "week" | "month">("day");
  const [chartData, setChartData] = useState<any>(null);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log(summary);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const chartRes = await axios.get("http://localhost:9999/stats/chart", {
          params: { range: rangeDays, unit },
        });

        const filteredData = chartRes.data.data.filter((item: any) => {
          if (unit === "day") {
            const dayName = dayjs(item.label).format("dddd");
            return WEEKDAYS.includes(dayName);
          }
          return true;
        });

        setChartData(filteredData);

        const summaryRes = await axios.get(
          "http://localhost:9999/stats/summary",
          {
            params: { range: rangeDays },
          }
        );
        setSummary(summaryRes.data);
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "Failed to load analytics";
        setError(errorMessage);
        console.error("Analytics error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [rangeDays, unit]);

  return (
    <div className="max-w-7xl w-full flex flex-col mx-auto p-6 gap-6">
      {loading && (
        <div className="text-center text-gray-600">Loading analytics...</div>
      )}

      {!loading && !error && chartData && (
        <>
          <AdminAnalyticsSummary summary={summary} range={rangeDays} />
          <AnalyticsControls
            range={rangeDays}
            unit={unit}
            onRangeChange={setRangeDays}
            onUnitChange={setUnit}
          />
          <MoodChart data={chartData} unit={unit} rangeDays={rangeDays} />
        </>
      )}
    </div>
  );
};

export default AdminAnalytics;
